// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Connecting to database.
const { MongoClient, ServerApiVersion } = require("mongodb");

// Setting up express.
const app = express();

// Use cors middleware for handling Cross-Origin Resource Sharing.
app.use(cors());

// Body parser middleware to handle JSON payloads.
app.use(bodyParser.json());

// Custom middleware for setting headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Other routes and middleware would go here...

// Start the server.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Mongo DB URI
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connecting to DB.
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

// Running connection function.
run().catch(console.dir);

// This is equivalent to a sign up / register API endpoint
app.post("/api/createRSO", async (req, res) => {
  // incoming: userId, color
  // outgoing: error
  const {
    yo1,
    yo2,
    rsoName,
    officerFirstName,
    officerLastName,
    password,
    email,
    phone,
    advisorName,
    advisorEmail,
    secondaryContactName,
    secondaryContactEmail,
    secondaryContactPhone,
    uniID,
  } = req.body;

  console.log(req.body);

  const newRSO = {
    RSOName: req.body.RSOName,
    OfficerFirstName: req.body.OfficerFirstName,
    OfficerLastName: req.body.OfficerLastName,
    Password: req.body.Password,
    Email: req.body.Email,
    Phone: req.body.Phone,
    AdvisorName: req.body.AdvisorName,
    AdvisorEmail: req.body.AdvisorEmail,
    SecondaryContactName: req.body.SecondaryContactName,
    SecondaryContactEmail: req.body.SecondaryContactEmail,
    SecondaryContactPhone: req.body.SecondaryContactPhone,
    UniID: req.body.UniID,
  };

  var error = "";

  try {
    const db = client.db("Reserv");
    const result = db.collection("RSO").insertOne(newRSO);
  } catch (e) {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

// Encryption library needs to be added
// const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const db = client.db("Reserv");
  const rso = await db.collection("RSO").findOne({ Email: email });

  if (!rso || rso.Password !== password) {
    // Remember to eventually hash and securely compare passwords!
    return res.status(400).json({ error: "Incorrect email or password" });
  }

  // // Payload for JWT
  // const jwtPayload = {
  //   RSOID: rso.RSOID,
  //   Email: rso.Email,
  //   AdminID: rso.AdminID,
  // };

  // Secret key (this should be a long, unguessable string stored in a secure way, not hard-coded!)
  //const secretKey = "your_very_secret_key_here";

  // // Generate JWT
  //const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

  // Construct response JSON object
  const responseObject = {
    // token: token, // remeber to add JWT
    RSOID: rso.RSOID,
    RSOName: rso.RSOName,
    Email: rso.Email,
    Phone: rso.Phone,
    AdvisorName: rso.AdvisorName,
    AdvisorEmail: rso.AdvisorEmail,
    UniID: rso.UniID,
    AdminID: rso.AdminID,
  };

  res.status(200).json(responseObject);
});

// PUT NEW APIs AFTER HERE
const { ObjectId } = require("mongodb"); // at the top of your file

app.post("/api/createEvent", async (req, res) => {
  const { RSOID, EventName, Description, StartEnd } = req.body;

  // Validate the StartEnd array
  if (!Array.isArray(StartEnd) || StartEnd.length !== 2) {
    return res.status(400).json({ error: "Invalid StartEnd format" });
  }

  const [startTime, endTime] = StartEnd;

  // Check if both startTime and endTime are within the valid range
  if (
    typeof startTime !== "number" ||
    typeof endTime !== "number" ||
    startTime < 0 ||
    startTime > 24 ||
    endTime < 0 ||
    endTime > 24
  ) {
    return res.status(400).json({ error: "Invalid time values provided" });
  }

  // Ensure start time is before end time
  if (startTime >= endTime) {
    return res
      .status(400)
      .json({ error: "Start time must be before end time" });
  }

  const db = client.db("Reserv");

  // Check if RSOID is a valid ObjectId string
  if (!ObjectId.isValid(RSOID)) {
    return res.status(400).json({ error: "Invalid RSOID format" });
  }

  // Convert RSOID string to ObjectId
  const objectId = new ObjectId(RSOID);

  // Check if RSOID exists
  const rsoExists = await db.collection("RSO").findOne({ RSOID: objectId });
  if (!rsoExists) {
    return res.status(400).json({ error: "Invalid RSOID" });
  }

  // If all checks pass, insert the event
  const newEvent = {
    RSOID,
    EventName,
    Description,
    StartEnd,
  };

  try {
    const result = await db.collection("Events").insertOne(newEvent);
    return res.status(200).json({ success: true, eventId: result.insertedId });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

// Example code for how to return availbility, need to see how to use this URL endpoint
app.get("/api/availability/:roomID/:date", async (req, res) => {
  const roomID = parseInt(req.params.roomID); // Convert RoomID to integer
  const day = req.params.date; // Date in "YYYY-MM-DD" format

  const db = client.db("Reserv");

  // Fetch events for the specified day and room from the database
  const eventsOnDay = await db
    .collection("Events")
    .find({ RoomID: roomID, Date: day })
    .toArray();

  // Initialize availability array with all true values
  // availability[0] being true means 9:00am to 9:30am is available.
  const availability = new Array(24).fill(true);

  eventsOnDay.forEach((event) => {
    // Calculate indices based on start and end times
    const startIndex = (event.StartEnd[0] - 9.0) * 2; // *2 because we're considering half-hour intervals
    const endIndex = (event.StartEnd[1] - 9.0) * 2;

    // Mark the hours between start and end times as false (unavailable)
    for (let i = startIndex; i <= endIndex; i++) {
      availability[i] = false;
    }
  });

  res.status(200).json({ availability: availability });
});

// PUT NEW APIs BEFORE HERE

// This needs to be the last get request.
// Remember to set this variable in heroku
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
