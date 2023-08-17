import express from "express";
// import { useContext } from 'react';
// import {FormDataContext} from '../client/src/components/FormDataContext'
import bodyParser from "body-parser";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import jwt from "jsonwebtoken";
// import UserProfile from "../client/src/components/UserProfile.jsx/index.js"
// data imports
import User from "./models/User.js";
import cookieParser from "cookie-parser";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import bcrypt from "bcrypt";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
// const { UserData } = useContext(FormDataContext);


// const cookieParser = require('cookie-parser');
/* CONFIGURATION */
dotenv.config();
const app = express();
// const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ddddkfjgmlllweffmssssssllfgjjgjgkgk';



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', // Update the origin to match your frontend's URL
}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);



function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post('/login', async (req, res) => {

  const { name, password } = req.body;
  const userDoc = await User.findOne({ name });

  if (userDoc) {
    if (userDoc.password === password) { // Plain text comparison (not secure)
      jwt.sign(
        {
          name: userDoc.name,
          id: userDoc._id
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('Invalid credentials'); // Sending "Invalid credentials" message
    }
  } else {
    res.status(422).json('User not found'); // Sending "User not found" message
  }


  // const { userName, password } = req.body;
  // const userDoc = await User.findOne({ userName });
  // if (userDoc) {
  //     const passOk = bcrypt.compareSync(password, userDoc.password);
  //     if (passOk) {
  //         jwt.sign({
  //             userName: userDoc.name,
  //             id: userDoc._id
  //         }, jwtSecret, {}, (err, token) => {
  //             if (err) throw err;
  //             res.cookie('token', token).json(userDoc);
  //         })

  //     } else {
  //         res.status(422).json('pass not ok');
  //     }
  // } else {
  //     res.status(422).json('not found')
  // }
})

app.get('/user/:id', async (req,res) =>{
  const {id} = req.params;
  res.json(await User.findById(id));
})


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Add this line
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    // User.updateMany(UserData);
  })
  .catch((error) => console.log(`${error} did not connect`));