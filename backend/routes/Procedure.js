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

router.post(
  "/procedure/add",
  [
    body("name").notEmpty().isString(),
    body("price").notEmpty().isString(),
    body("description").isString(),
    // Add more validations for other fields if needed
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const procedureData = req.body;
      const userSub = procedureData.sub;

      const procedureCollection = client.db("crm").collection("procedures");

      // Add the new procedure to the user's collection
      const newProcedure = {
        name: procedureData.name,
        price: procedureData.price,
        description: procedureData.description,
      };

      // Update or insert the user's procedure document
      const result = await procedureCollection.updateOne(
        { sub: userSub },
        { $push: { procedures: newProcedure } },
        { upsert: true }
      );

      res.status(201).json({
        message: "Procedure added successfully",
        procedure: newProcedure,
      });
    } catch (error) {
      console.error("Error in /procedure/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/procedures/get", async (req, res) => {
  console.log("Received request to /procedures/get");
  try {
    let { sub } = req.headers;

    if (!sub) {
      console.log("No sub received");
      return res.status(401).json({ message: "Authentication failed" });
    }

    const collection = client.db("crm").collection("procedures");
    const userProcedures = await collection.findOne({ sub: sub });

    if (!userProcedures || !userProcedures.procedures) {
      console.log("No user procedures found");
      return res.json([]); // Return an empty array
    }

    // Check if the user's procedures list is empty
    if (userProcedures.procedures.length === 0) {
      console.log("User's procedures list is empty");
      return res.json([]); // Return an empty array
    }

    res.json(userProcedures.procedures);
  } catch (error) {
    console.error("Error fetching user procedures:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/procedure/delete", async (req, res) => {
  console.log("Received request to /procedure/delete");
  console.log(req.body); // Log the full request

  try {
    let { sub, name } = req.body;

    console.log(`Received sub: ${sub}`); // Log the received sub
    console.log(`Received procedureName: ${name}`); // Log the received procedureName

    if (!sub || !name) {
      console.log("No sub or procedure name received");
      return res.status(400).json({ message: "Bad request" });
    }

    const collection = client.db("crm").collection("procedures");
    const result = await collection.updateOne(
      { sub: sub },
      { $pull: { procedures: { name: name } } }
    );

    if (result.modifiedCount === 0) {
      console.log("No procedure deleted");
      return res.status(404).json({ message: "Procedure not found" });
    }

    res.json({ message: "Procedure deleted successfully" });
  } catch (error) {
    console.error("Error deleting procedure:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
