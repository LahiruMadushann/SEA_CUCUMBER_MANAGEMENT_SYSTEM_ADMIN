import express from "express";
import { getUser, getDashboardStats, updateUser } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.put('/user/:id', updateUser);

export default router;
