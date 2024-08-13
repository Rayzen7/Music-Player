import Music from "../models/music.js";
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Multer setting
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
export const uploadMusic = upload.single('file');

// Create
export const createMusic = async (req, res) => {
    try {
        const { title, artist } = req.body;
        const originalPath = path.join('uploads', req.file.filename);
        const mp3Filename = `${Date.now()}.mp3`;
        const mp3Path = path.join('uploads', mp3Filename);

        ffmpeg(originalPath)
            .toFormat('mp3')
            .on('end', async () => {
                fs.unlink(originalPath, (err) => {
                    if (err) {
                        console.error("Error deleting original file:", err);
                        return res.status(500).json({ message: "Error deleting original file" });
                    }

                    // Simpan informasi musik ke database
                    const music = new Music({
                        title,
                        artist,
                        fileUrl: mp3Filename,
                    });

                    music.save()
                        .then((createdMusic) => res.status(201).json(createdMusic))
                        .catch((error) => {
                            console.error("Error saving music to database:", error);
                            res.status(500).json({ message: "Error saving music to database" });
                        });
                });
            })
            .on('error', (err) => {
                console.error("Error converting to MP3:", err);
                res.status(500).json({ message: "Error converting to MP3" });
            })
            .save(mp3Path);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get
export const getMusic = async (req, res) => {
    try {
        const musics = await Music.find({});
        res.status(200).json(musics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Download
export const downloadMusic = async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), 'uploads', req.params.filename);
        console.log('Attempting to serve file at:', filePath);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete
export const deleteMusic = async (req, res) => {
    try {
        const music = await Music.findById(req.params.id);

        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }

        const filePath = path.join(process.cwd(), 'uploads', music.fileUrl);
        console.log('Attempting to delete file at:', filePath);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File does not exist:', err);
                return res.status(404).json({ message: 'File does not exist' });
            }

            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).json({ message: 'Failed to delete file' });
                }

                try {
                    await Music.deleteOne({ _id: req.params.id });
                    res.status(200).json({ message: 'Music deleted successfully' });
                } catch (err) {
                    console.error('Error deleting from database:', err);
                    res.status(500).json({ message: 'Failed to delete from database' });
                }
            });
        });
    } catch (error) {
        console.error('Error in deleteMusic controller:', error);
        res.status(500).json({ message: error.message });
    }
};
