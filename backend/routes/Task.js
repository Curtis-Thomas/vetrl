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
  "/task/add",
  [
    body("sub").notEmpty().isString(),
    body("title").notEmpty().isString(),
    body("description").notEmpty().isString(),
    body("deadline").notEmpty().isString(),
    // Add more validations for other fields if needed
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const taskData = req.body;
      const userSub = taskData.sub;

      const taskCollection = client.db("crm").collection("task");

      const newTask = {
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline,
      };

      const result = await taskCollection.updateOne(
        { sub: userSub },
        { $push: { tasks: newTask } },
        { upsert: true }
      );

      res.status(201).json({
        message: "Task added successfully",
        task: newTask,
      });
    } catch (error) {
      console.error("Error in /task/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/task/get", async (req, res) => {
  console.log("Received request to /task/get");
  try {
    let { sub } = req.headers;

    if (!sub) {
      console.log("No sub received");
      return res.status(401).json({ message: "Authentication failed" });
    }

    const collection = client.db("crm").collection("task");
    const userTasks = await collection.findOne({ sub: sub });

    if (!userTasks || !userTasks.tasks) {
      console.log("No user tasks found");
      return res.json([]); // Return an empty array
    }

    // Check if the user's task list is empty
    if (userTasks.tasks.length === 0) {
      console.log("User's task list is empty");
      return res.json([]); // Return an empty array
    }

    res.json(userTasks.tasks);
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/task/delete", async (req, res) => {
  console.log("Received request to /task/delete");
  console.log(req.body); // Log the full request

  try {
    let { sub, title } = req.body;

    console.log(`Received sub: ${sub}`); // Log the received sub
    console.log(`Received taskTitle: ${title}`); // Log the received taskTitle

    if (!sub || !title) {
      console.log("No sub or task title received");
      return res.status(400).json({ message: "Bad request" });
    }

    const collection = client.db("crm").collection("task");
    const result = await collection.updateOne(
      { sub: sub },
      { $pull: { tasks: { title: title } } }
    );

    if (result.modifiedCount === 0) {
      console.log("No task deleted");
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
