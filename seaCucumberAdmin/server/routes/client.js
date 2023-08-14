import express from "express";

import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  updateUserDetail,
} from "../controllers/client.js";

const router = express.Router();


router.get("/products", getProducts);
router.get("/userProfile",updateUserDetail)
// router.get("/managementUsers",getCustomers);//----
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);



export default router;
