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
  "/record/add",
  [
    body("clientId").isString(),
    body("patientId").isString(),
    body("appointmentNo").notEmpty().isString(),
    body("date").isString(),
    body("time").isString(),
    body("anamnesis").isString(),
    body("diagnosis").isString(),
    body("additionalNotes").isString(),
    body("procedures").isString(),
    body("medicine").isString(),
    body("supplies").isString(),
    body("dischargeNotes").isString(),
    body("totalPrice").isNumeric(),
  ],
  async (req, res) => {
    console.log(req.body); // Log the incoming request body

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const recordData = req.body;
      const userSub = recordData.sub;

      const recordCollection = client.db("crm").collection("record");

      // Get the user's document
      const userDoc = await recordCollection.findOne({ sub: userSub });

      // Get the current count of records
      const recordCount = userDoc ? userDoc.records.length : 0;

      // Generate a new ID that starts with 'r'
      const id = String(recordCount + 1);

      // Add the new record to the user's list
      const newRecord = {
        id: id,
        clientId: recordData.clientId,
        patientId: recordData.patientId,
        appointmentNo: recordData.appointmentNo,
        date: recordData.date,
        time: recordData.time,
        anamnesis: recordData.anamnesis,
        diagnosis: recordData.diagnosis,
        additionalNotes: recordData.additionalNotes,
        procedures: recordData.procedures,
        medicine: recordData.medicine,
        supplies: recordData.supplies,
        dischargeNotes: recordData.dischargeNotes,
        totalPrice: recordData.totalPrice,
      };

      const result = await recordCollection.updateOne(
        { sub: userSub },
        { $push: { records: newRecord } },
        { upsert: true }
      );

      res
        .status(201)
        .json({ message: "Record added successfully", record: newRecord });
    } catch (error) {
      console.error("Error in /record/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/record/get", async (req, res) => {
  const userSub = req.headers.sub;

  if (!userSub) {
    return res.status(400).json({ message: "Missing user sub in headers" });
  }

  try {
    const recordCollection = client.db("crm").collection("record");

    // Get the user's document
    const userDoc = await recordCollection.findOne({ sub: userSub });

    // If the user's document doesn't exist, return an empty array
    if (!userDoc) {
      return res.status(200).json([]);
    }

    // Return the user's records
    res.status(200).json(userDoc.records); // Changed from userDoc.events to userDoc.records
  } catch (error) {
    console.error("Error in /record/get:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/record/getNextId", async (req, res) => {
  try {
    const recordCollection = client.db("crm").collection("record");

    // Find the document with the highest ID in the records array
    const highestRecord = await recordCollection
      .aggregate([
        { $unwind: "$records" },
        { $group: { _id: null, maxId: { $max: { $toInt: "$records.id" } } } },
      ])
      .toArray();

    // The next ID is the highest ID plus one
    const nextId = highestRecord.length > 0 ? highestRecord[0].maxId + 1 : 1;

    // Return the next ID
    res.status(200).json({ nextId: nextId.toString() });
  } catch (error) {
    console.error("Error in /record/getNextId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
