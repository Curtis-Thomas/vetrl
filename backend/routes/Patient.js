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
  "/patient/add",
  [
    body("clientId").notEmpty().isString(),

    body("name").notEmpty().isString(),
    body("species").isString(),
    body("breed").isString(),
    body("age").isString(),
    body("weight").isString(),
    // Add more validations for other fields if needed
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const patientData = req.body;
      const userSub = patientData.sub;

      const patientCollection = client.db("crm").collection("patient");
      const clientCollection = client.db("crm").collection("client");

      // Get the user's document
      const userDoc = await patientCollection.findOne({ sub: userSub });

      // Get the current count of patients
      const patientCount = userDoc ? userDoc.patients.length : 0;

      // Generate a new ID that starts with 'p'
      const id = "p" + String(patientCount + 1);

      // Add the new patient to the user's list
      const newPatient = {
        id: id,
        clientId: patientData.clientId,
        name: patientData.name,
        species: patientData.species,
        breed: patientData.breed,
        age: patientData.age,
        weight: patientData.weight,
      };

      // Update or insert the user's document
      const result = await patientCollection.updateOne(
        { sub: userSub },
        { $push: { patients: newPatient } },
        { upsert: true }
      );

      // Add the new patient ID to the client's document
      await clientCollection.updateOne(
        { "events.id": patientData.clientId },
        { $push: { "events.$.patients": id } }
      );

      res
        .status(201)
        .json({ message: "Patient added successfully", patient: newPatient });
    } catch (error) {
      console.error("Error in /patient/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post("/patient/search", async (req, res) => {
  console.log("Received request:", req.body); // Log the incoming request

  try {
    const { id } = req.body;

    const patientCollection = client.db("crm").collection("patient");

    // Find the document where a patient in the 'patients' array has the given 'id'
    const document = await patientCollection.findOne(
      { "patients.id": id },
      { projection: { "patients.$": 1 } }
    );

    if (!document || !document.patients || document.patients.length === 0) {
      return res.status(404).json({ message: "No patient found with this ID" });
    }

    // Return the found patient
    res
      .status(200)
      .json({ message: "Patient found", patient: document.patients[0] });
  } catch (error) {
    console.error("Error in /patient/search:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/patient/all", async (req, res) => {
  console.log("Received request for all patients");

  try {
    const patientCollection = client.db("crm").collection("patient");

    // Find all documents in the 'patient' collection
    const documents = await patientCollection.find({}).toArray();

    if (!documents || documents.length === 0) {
      return res
        .status(200)
        .json({ message: "No patients found", patients: [] });
    }

    // Return all patients
    res.status(200).json({ message: "Patients found", patients: documents });
  } catch (error) {
    console.error("Error in /patient/all:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
