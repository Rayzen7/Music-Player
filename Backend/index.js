import express from 'express';
import cors from 'cors';
import ConnectDB from './config/connectDb.js';
import router from './routes/musicRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import adminRouter from './routes/adminRouter.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
});

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors({
    origin: ["https://music-player-nu-liart.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204 
}));

ConnectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/music', router);
app.use('/api/admin', adminRouter);

// Start server
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
