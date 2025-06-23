import LinkModel from "../Models/LinkModel.js";
import UserModel from "../Models/UserModel.js";
import LinkController from "./LinkConrtoller.js";
import express from "express";
import axios from 'axios'; // הוספת ייבוא של axios

// יצירת אובייקט App של Express לצורך שימוש ב-middleware
const app = express();
const UserController = {
    getList: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.send(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send({ message: "Error fetching users" });
        }
    },
    getById: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error fetching user" });
        }
    },
    // 
    
add: async (req, res) => {
    const { name, email, password, links } = req.body;

    try {
      // יצירת המשתמש
      const user = await UserModel.create({ name, email, password });

      // מערך של הקישורים שיצרנו
      const createdLinks = await LinkModel.insertMany(
        links.map((link) => ({
            originalUrl: link.originalUrl,
        }))
      );

      // מעבר על כל הקישורים שנוצרו וקישורם למשתמש
      for (const link of createdLinks) {
        user.links.push(link._id);
        // link.users.push(user._id);
        await link.save();
      }

      // שמירת המשתמש במסד הנתונים
      await user.save();

      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

    update: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: "Error updating user", error });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.send({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error deleting user" });
        }
    }
};

export default UserController;
