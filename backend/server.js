require("dotenv").config();

const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");

const userRoute = require("./routes/User");
const eventRoute = require("./routes/Event");
const clientRoute = require("./routes/Client");
const patientRoute = require("./routes/Patient");
const recordRoute = require("./routes/Record");
const drugsRoute = require("./routes/Drugs");
const procedureRoute = require("./routes/Procedure");
const suppliesRoute = require("./routes/Supplies");
const taskRoute = require("./routes/Task");

// Create a new MongoClient
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use cors middleware
app.use(cors());
// Helmet for secure headers
app.use(helmet());
// parse application/json
app.use(express.json({ limit: "10kb" }));

// Connect to MongoDB and create users collection
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Create a users collection and add test users
    const db = client.db("crm");
    const usersCollection = db.collection("users");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Delay the run function by 1000 milliseconds (1 second) to ensure everything else loads correctly
setTimeout(() => {
  run().catch(console.dir);
}, 1000);

app.use("/user", userRoute);

app.use("/event", eventRoute);
app.use("/client", clientRoute);
app.use("/patient", patientRoute);
app.use("/record", recordRoute);
app.use("/drugs", drugsRoute);
app.use("/procedure", procedureRoute);
app.use("/supplies", suppliesRoute);
app.use("/task", taskRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
