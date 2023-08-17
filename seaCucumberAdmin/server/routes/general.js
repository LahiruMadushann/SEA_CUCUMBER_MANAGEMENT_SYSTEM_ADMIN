import express from "express";
import { getUser, getDashboardStats, updateUser, addUser, deleteFarmer } from "../controllers/general.js";
import fileUpload from "express-fileupload";

const router = express.Router();
router.use(fileUpload());
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.put('/user/:id', updateUser);
router.post('/add', addUser);
router.delete('/deleteFarmer/:id', deleteFarmer);

export default router;