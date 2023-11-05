// Dependencies
const express = require("express");
const path = require("path");
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
const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const db = client.db("Reserv");
  const rso = await db.collection("RSO").findOne({ Email: email });

  if (!rso || rso.Password !== password) {
    // Remember to eventually hash and securely compare passwords!
    return res.status(400).json({ error: "Incorrect email or password" });
  }

  // Payload for JWT
  const jwtPayload = {
    RSOID: rso.RSOID,
  };

  // Secret key (this should be a long, unguessable string stored in a secure way, not hard-coded!)
  const secretKey =
    "7d4c5e4023a7f91857c1b7ad8c6286a7e5b2c0d8e1f8b2c7e3a9d4e5f6b7c8d9";

  // Generate JWT
  const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

  // Construct response JSON object
  const responseObject = {
    token: token, // remeber to add JWT
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

app.get("/api/RetrieveEvents", async(req, res) => {
  const { Latitude, Longitude } = req.body;
  var eventListReturn = {};
  console.log(Latitude);

  const db = client.db("Reserv");
  const returnArray = [];
  const eventList = await db.collection("Room").find({ RSOID : RSOID }).toArray();

  eventList.forEach(event => {
    returnArray.push({
      EventID: event.EventID,
      Date: event.Date,
      EventType: event.EventType,
      NumAttendees: event.NumAttendees,
      Description: event.Description,
      AtriumOccupy: event.AtriumOccupy,
      AtriumBuilding: event.AtriumBuilding,
      StartEnd: event.StartEnd,
      RSOID: event.RSOID,
      RoomID: event.RoomID
    });
    
    eventListReturn = {eventList:returnArray}
  });

  res.status(200).json(eventListReturn);
});

app.put("/api/UpdateEvent", async(req,res)=>{
  const {EventID, EventName, Description}  = req.body;
  const db = client.db("Reserv");
  
  const update = await db.collection("Event").updateOne({EventID:EventID},{EventName:EventName, Description:Description})
  res.status(200).json(update);
});

app.delete("/api/DeleteEvent", async(req,res)=>{
  const {EventID}  = req.body;
  const db = client.db("Reserv");
  
  const update = await db.collection("Event").deleteOne({EventID:EventID});
  res.status(200).json(update);
});

app.post("/api/RetrieveRooms", async (req, res) => {
  const { Latitude, Longitude } = req.body;
  var roomListReturn = {};
  console.log(Latitude);

  const db = client.db("Reserv");
  const building = await db.collection("Building").findOne({ Latitude: Latitude, Longitude: Longitude });

  
  // Construct response JSON object
  const responseObject = {
    // token: token, // remeber to add JWT
    BuildingID: building.BuildingID,
    BuildingName: building.BuildingName,
    Latitude: building.Latitude,
    Longitude: building.Longitude,
    UniID: building.UniID,
  };
  const returnArray = [];
  const roomList = await db.collection("Room").find({ BuildingID : responseObject.BuildingID.toString() }).toArray();

  roomList.forEach(room => {
    returnArray.push({
      RoomID: room.RoomID,
      RoomNumber: room.RoomNumber,
      RoomInfo: room.RoomInfo,
      MediaEquip: room.MediaEquip,
      RoomType: room.RoomType,
      Date: room.Date,
      ResrveTimes: room.ResrveTimes,
      UniID: room.UniID,
      BuildingID: room.BuildingID
    });
    
    roomListReturn = {roomList:returnArray}
  });

  res.status(200).json(roomListReturn);
});

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from Bearer

    const secretKey =
      "7d4c5e4023a7f91857c1b7ad8c6286a7e5b2c0d8e1f8b2c7e3a9d4e5f6b7c8d9";

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user; // Store user information from JWT to request object
      next(); // Continue to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

// PUT NEW APIs AFTER HERE, this first one has JWT but others don't yet.

app.post("/api/createEvent", authenticateJWT, async (req, res) => {
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

  // Check if RSOID is a valid ObjectId string, this could be changed to not use the object ID
  if (!ObjectId.isValid(RSOID)) {
    return res.status(400).json({ error: "Invalid RSOID format" });
  }

  // Convert RSOID string to ObjectId
  const objectId = new ObjectId(RSOID);

  // Check if RSOID exists
  const rsoExists = await db.collection("RSO").findOne({ RSOID: RSOID });
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

// Other APIs still need JWT.
app.get(
  "/api/availability/:roomID/:date/:intervals",
  authenticateJWT,
  async (req, res) => {
    // Convert RoomID to integer
    const roomID = req.params.roomID;
    // Format: MM-DD-YYYY
    const day = req.params.date;
    // 1 = 30 minutes, 2 = 60 minutes, ...
    const intervalsRequired = parseInt(req.params.intervals);

    const db = client.db("Reserv");

    // Fetch events for the specified day and room from the database
    const eventsOnDay = await db
      .collection("Events")
      .find({ RoomID: roomID, Date: day })
      .toArray();

    // res.status(200).json({ eventsOnDay: eventsOnDay });

    // Initialize availability array with all true values
    // availability[0] being true means 9:00am to 9:30am is available.
    const availability = new Array(48).fill(true);

    eventsOnDay.forEach((event) => {
      // Calculate indices based on start and end times
      const startIndex = event.StartEnd[0] * 2; // *2 because we're considering half-hour intervals
      const endIndex = event.StartEnd[1] * 2;

      // Mark the hours between start and end times as false (unavailable)
      for (let i = startIndex; i < endIndex; i++) {
        availability[i] = false;
      }
    });

    // res.status(200).json({ availability: availability });

    // Calculate continuous availability slots using the provided function
    const continuousAvailabilitySlots = findContinuousAvailability(
      availability,
      intervalsRequired
    );

    res
      .status(200)
      .json({ continuousAvailability: continuousAvailabilitySlots });
  }
);

function findContinuousAvailability(availability, intervalsRequired) {
  const availableSlots = [];

  for (let i = 0; i <= availability.length - intervalsRequired; i++) {
    if (availability.slice(i, i + intervalsRequired).every((val) => val)) {
      availableSlots.push({
        start: i / 2, // Convert index to hours
        end: (i + intervalsRequired) / 2, // Convert index to hours
      });
    }
  }

  return availableSlots;
}

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