import { register, login } from "../controllers/adminController.js";
import express from "express";

const adminRouter = express.Router();

adminRouter.post('/Adminregister', register);
adminRouter.post('/Adminlogin', login);

export default adminRouter;
