import express from "express";
import { getUser, getDashboardStats, updateUser, addUser, deleteFarmer, getAllUsers, getFishermens, getFarmers, getExporters, updateUserImage, updateUserState } from "../controllers/general.js";
import fileUpload from "express-fileupload";

const router = express.Router();
router.use(fileUpload());
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.put('/user/:id', updateUser);
router.put('/user/image/:id',updateUserImage);
router.post('/add', addUser);
router.delete('/deleteFarmer/:id', deleteFarmer);
router.put('/updateStatus/:id', updateUserState);
router.get("/allUsers",getAllUsers);
router.get("/fishermens",getFishermens);
router.get("/farmers",getFarmers);
router.get("/exporters",getExporters);

export default router;