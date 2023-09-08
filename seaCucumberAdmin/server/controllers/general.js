import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';
import Knowledge from "../models/Knowledge.js";
import News from "../models/News.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await User.findById(id);
    res.json(await User.findById(id));
    // res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// app.get('/places/:id', async (req,res) =>{
//   const {id} = req.params;
//   res.json(await Place.findById(id));
// })

export const updateUser = async (req, res) => {
  try {
    // Get the user ID from the request params and update data from the request body
    const { id } = req.params;
    const updateData = req.body;
    console.log("Update User ID:", id);
    console.log("Update Data:", updateData);

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });


    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUserState = async (req, res) => {
  try {
    // Get the user ID and action from the request params
    const { id } = req.params;
    const { action } = req.body;

    // Check if the user with the given ID exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's state based on the action
    const newState = action === "activate" ? "activate" : "deactivate";
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { state: newState }, // Update the state based on the action
      { new: true }
    );

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







// ...

export const updateUserImage = async (req, res) => {
  try {
    console.log("Update User Image Route Triggered");
    // Get the user ID from the request params
    const { id } = req.params;
    const updateData = req.body;
    const selectedImage = req.files.image;

    // Find the user by ID
    const user = await User.findById(id);
    const previousImageName = user.image;

     // Delete the previous image file from the uploads folder
     if (previousImageName) {
      const previousImagePath = path.join(__dirname, '..', 'uploads', previousImageName);
      fs.unlinkSync(previousImagePath);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle image upload and store the image file
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, '..', 'uploads', image.name);

      await image.mv(imagePath);
      const imageUrl = image.name;

      // Update the user's image property
      user.image = imageUrl;
      console.log("User before image update:", user);

      // Save the updated user
      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ message: "No image provided" });
    }
  } catch (error) {
    console.error("Error updating user image:", error);
    res.status(500).json({ message: "An error occurred while updating the user image" });
  }
};


export const addUser = async (req, res) => {
  try {
    // Get the user data from the request body
    const userData = req.body;

    // Create a new user using the User model
    const newUser = new User(userData);
    console.log("Received user data:", newUser);
    // Handle image upload and store the image file
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, '..', 'uploads', image.name);

      await image.mv(imagePath);
      const imageUrl = image.name
      newUser.image = imageUrl; // Store the image path in the user object
    }

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the newly added user
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const addMessage = async(req, res) => {
  try{
    console.log("Received message data:", req.body);
    const { userId, role, message } = req.body;
    console.log("Received role:", role); // Log the role

    const newMessage = new News({
      userId,
      role,
      message
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);

  }catch(error){
    console.error("Error saving message:", error);
    res.status(400).json({ message: error.message});
  }
}

export const addKnowledge = async (req, res) => {
  try {
    // Get the user data from the request body
    const knowledge = req.body;

    // Create a new user using the User model
    const newKnowledge = new Knowledge(knowledge);
    console.log("Received user data:", newKnowledge);
    // Handle image upload and store the image file
    if (req.files && req.files.image) {
      const image = req.files.image;
      const imagePath = path.join(__dirname, '..', 'knowledgeImages', image.name);

      await image.mv(imagePath);
      const imageUrl = image.name
      newKnowledge.image = imageUrl; // Store the image path in the user object
    }

    // Save the new user to the database
    const savedKnowledge = await newKnowledge.save();

    // Return the newly added user
    res.status(201).json(savedKnowledge);
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(400).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const roles = ["user", "exporter","admin","fishermen","farmer"]; // Add the roles you want to retrieve here
    const allUsers = await User.find({ role: { $in: roles } }).select("-password");
console.log("All the users Roles",allUsers)
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getFishermens = async (req, res) => {
  try {
    const roles = ["fishermen"]; 
    const allUsers = await User.find({ role: { $in: roles } }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFarmers = async (req, res) => {
  try {
    const roles = ["farmer"]; 
    const allUsers = await User.find({ role: { $in: roles } }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getExporters = async (req, res) => {
  try {
    const roles = ["exporter"]; 
    const allUsers = await User.find({ role: { $in: roles } }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteFarmer = async (req, res) => {
  try {
    // Get the user ID from the request params
    const { id } = req.params;

    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the user" });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2023;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};