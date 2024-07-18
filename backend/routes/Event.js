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
  "/event/add",
  [
    body("sub").notEmpty().isString(),
    body("title").notEmpty().isString(),
    body("clientId").isString(),
    body("patientId").isString(),
    body("date").notEmpty().isString(),
    body("description").isString(),
    body("start").isString(),
    body("end").isString(),

    // Add more validations for other fields if needed
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const eventData = req.body;
      const userSub = eventData.sub;

      // Find the user's calendar document or create it if not exists
      const eventCollection = client.db("crm").collection("calendar");

      // Add the new event to the user's calendar
      const newEvent = {
        title: eventData.title,
        date: eventData.date,
        clientId: eventData.clientId,
        patientId: eventData.patientId,
        description: eventData.description,
        start: eventData.start,
        end: eventData.end,
      };

      // Update or insert the user's calendar document
      const result = await eventCollection.updateOne(
        { sub: userSub },
        { $push: { events: newEvent } }, // Add the new event to the events array
        { upsert: true }
      );

      res
        .status(201)
        .json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
      console.error("Error in /event/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/events/get", async (req, res) => {
  console.log("Received request to /events/get");
  try {
    let { sub } = req.headers;

    if (!sub) {
      console.log("No sub received");
      return res.status(401).json({ message: "Authentication failed" });
    }

    const collection = client.db("crm").collection("calendar");
    const userEvents = await collection.findOne({ sub: sub });

    if (!userEvents || !userEvents.events) {
      console.log("No user events found");
      return res.status(404).json({ message: "User events not found" });
    }

    // Check if the user's calendar is empty
    if (userEvents.events.length === 0) {
      console.log("User's calendar is empty");
      return res
        .status(200)
        .json({ message: "User's calendar is empty", events: [] });
    }

    res.json(userEvents.events);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/calendarDay", async (req, res) => {
  console.log("Received request to /calendarDay");
  try {
    let { sub, "custom-date": date } = req.headers; // Use 'custom-date' instead of date

    if (!sub || !date) {
      console.log("No sub or date received");
      return res.status(401).json({ message: "Authentication failed" });
    }

    const db = client.db("crm");
    const collection = db.collection("calendar");

    // Check if the 'calendar' collection exists
    if (!(await db.listCollections({ name: "calendar" }).hasNext())) {
      console.log("No 'calendar' collection found");
      return res.json([]); // Return an empty array
    }

    const userEvents = await collection.findOne({ sub: sub });

    if (!userEvents || !userEvents.events) {
      console.log("No user events found");
      return res.json([]); // Return an empty array
    }

    // Filter events based on the provided date
    const filteredEvents = userEvents.events.filter((event) => {
      const eventDate = new Date(event.date).toDateString();
      return eventDate === new Date(date).toDateString();
    });

    // Check if there are any events for the provided date
    if (filteredEvents.length === 0) {
      console.log("No events found for the provided date");
      return res.json([]); // Return an empty array
    }

    res.json(filteredEvents);
    console.log("Success request to /calendarDay");
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
