import Music from "../models/music.js";
import multer from 'multer'; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../firebaseConfig.js";

// Multer setting
const storageConfig = multer.memoryStorage(); 
export const uploadMusic = multer({ 
    storage: storageConfig,
    limits: { fileSize: 10 * 1024 * 1024 } 
}).single('file');

// Create
export const createMusic = async (req, res) => {
    try {
        const { title, artist } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        const storageRef = ref(storage, `audio/${uniqueFilename}`);
        const metadata = { contentType: file.mimetype };

        await uploadBytes(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(storageRef);
        const music = new Music({
            title,
            artist,
            fileUrl: downloadURL,
            filename: uniqueFilename,
        });

        await music.save();
        res.status(201).json(music);
    } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
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
        const music = await Music.findById(req.params.id);

        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }

        res.status(200).json({ url: music.fileUrl });
    } catch (error) {
        console.error('Error in downloadMusic controller:', error);
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

        if (!music.filename) {
            return res.status(400).json({ message: 'Filename is missing' });
        }

        console.log(`Attempting to delete file with filename: ${music.filename}`);

        const storageRef = ref(storage, `audio/${music.filename}`);
        console.log(`Firebase Storage path: ${storageRef.fullPath}`);

        try {
            await deleteObject(storageRef);
            console.log(`File ${music.filename} deleted from Firebase Storage`);
        } catch (firebaseError) {
            if (firebaseError.code === 'storage/object-not-found') {
                console.error(`File ${music.filename} not found in Firebase Storage`);
                return res.status(404).json({ message: 'File not found in Firebase Storage' });
            }
            throw firebaseError; 
        }
        await Music.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Music deleted successfully' });
    } catch (error) {
        console.error('Error deleting music:', error);
        res.status(500).json({ message: error.message });
    }
};
