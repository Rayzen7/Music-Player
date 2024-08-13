import express from "express";
import { uploadMusic, createMusic, downloadMusic, getMusic, deleteMusic } from "../controllers/musicController.js";

const router = express.Router();

router.post('/upload', uploadMusic, createMusic);
router.get('/', getMusic);
router.get('/download/:filename', downloadMusic);
router.delete('/:id', deleteMusic);

export default router