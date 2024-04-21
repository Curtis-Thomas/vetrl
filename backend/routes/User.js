require("dotenv").config();

const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");

const router = express.Router();

// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();

// Input validation for addUser route
router.post(
  "/addUser",
  [
    body("sub").notEmpty().isString(),
    // Add more validations for other fields if needed
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const collection = client.db("crm").collection("users");
      let userData = req.body;

      // Check if a user with the same'sub' already exists
      const existingUser = await collection.findOne({ sub: userData.sub });

      if (existingUser) {
        // If the user exists, do not add them again
        return res.json({ message: "User already exists" });
      }

      // If the user does not exist, add them to the database
      const result = await collection.insertOne(userData);
      res.json(result);
    } catch (error) {
      console.error("Error in /addUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
