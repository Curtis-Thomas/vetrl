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
  "/client/add",
  [
    body("name").notEmpty().isString(),
    body("phone").isString(),
    body("email").isString(),
    body("businessId").isString(),
    body("streetAddress").isString(),
    body("zipCode").isString(),
    body("city").isString(),
    body("county").isString(),
    body("country").isString(),
  ],
  async (req, res) => {
    console.log(req.body); // Log the incoming request body

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const clientData = req.body;
      const userSub = clientData.sub;

      const clientCollection = client.db("crm").collection("client");

      // Get the user's document
      const userDoc = await clientCollection.findOne({ sub: userSub });

      // Get the current count of events
      const eventCount = userDoc ? userDoc.events.length : 0;

      // Generate a new ID
      const id = String(eventCount + 1);

      // Add the new event to the user's calendar
      const newClient = {
        id: id,
        name: clientData.name,
        phone: clientData.phone,
        email: clientData.email,
        businessId: clientData.businessId,
        streetAddress: clientData.streetAddress,
        zipCode: clientData.zipCode,
        city: clientData.city,
        county: clientData.county,
        country: clientData.country,
      };

      // Update or insert the user's calendar document
      const result = await clientCollection.updateOne(
        { sub: userSub },
        { $push: { events: newClient } },
        { upsert: true }
      );

      res
        .status(201)
        .json({ message: "Client added successfully", event: newClient });
    } catch (error) {
      console.error("Error in /client/add:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
router.post("/client/search", async (req, res) => {
  try {
    const clientData = req.body;
    console.log("Received request with data:", clientData);

    const clientCollection = client.db("crm").collection("client");

    // Find the document using the 'sub' field
    const document = await clientCollection.findOne({ sub: clientData.sub });

    if (!document || !document.events) {
      console.log("Document or events not found");
      return res.status(404).json({ message: "Document or events not found" });
    }

    // Create an array of search conditions, excluding the 'sub' field and fields with empty strings
    const searchConditions = Object.keys(clientData)
      .filter((key) => key !== "sub" && clientData[key] !== "")
      .map((key) => ({
        [key]: clientData[key],
      }));

    console.log("Search conditions:", searchConditions);
    // Find the clients in the document's events array
    const foundClients = document.events.filter((clientItem) =>
      searchConditions.every((condition) =>
        clientItem[Object.keys(condition)[0]]
          .toLowerCase()
          .includes(Object.values(condition)[0].toLowerCase())
      )
    );

    if (foundClients.length > 0) {
      console.log("Clients found:", foundClients);
      return res
        .status(200)
        .json({ message: "Clients found", clients: foundClients });
    } else {
      console.log("Clients not found");
      return res.status(404).json({ message: "Clients not found" });
    }
  } catch (error) {
    console.error("Error in /client/search:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/client/searchAll", async (req, res) => {
  console.log("Received request for all clients");

  try {
    const clientCollection = client.db("crm").collection("client");

    // Find all documents in the 'client' collection
    const documents = await clientCollection.find({}).toArray();

    if (!documents || documents.length === 0) {
      return res.status(200).json({ message: "No clients found", clients: [] });
    }

    // Return all clients
    res.status(200).json({ message: "Clients found", clients: documents });
  } catch (error) {
    console.error("Error in /client/searchAll:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
