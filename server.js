// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Connecting to database.
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

const jwt = require("jsonwebtoken");
const { env } = require("process");

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
  const secretKey = process.env.SECRET_KEY;

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

app.get("/api/RetrieveEvents", async (req, res) => {
  const { RSOID } = req.body;
  var eventListReturn = {};

  const db = client.db("Reserv");
  const returnArray = [];
  const eventList = await db
    .collection("Events")
    .find({ RSOID: RSOID })
    .toArray();

  eventList.forEach((event) => {
    returnArray.push({
      EventID: event.EventID,
      EventName: event.EventName,
      Date: event.Date,
      EventType: event.EventType,
      NumAttendees: event.NumAttendees,
      Description: event.Description,
      AtriumOccupy: event.AtriumOccupy,
      AtriumBuilding: event.AtriumBuilding,
      StartEnd: event.StartEnd,
      RSOID: event.RSOID,
      RoomID: event.RoomID,
    });

    eventListReturn = { eventList: returnArray };
  });

  res.status(200).json(eventListReturn);
});

app.put("/api/UpdateEvent", async (req, res) => {
  const { EventID, EventName, Description } = req.body;
  const db = client.db("Reserv");
  var eventObjectId = new ObjectId(EventID);

  const update = await db
    .collection("Events")
    .updateOne(
      { EventID: eventObjectId },
      { $set: { EventName: EventName, Description: Description } }
    );
  res.status(200).json(update);
});

app.delete("/api/DeleteEvent", async (req, res) => {
  const { EventID } = req.body;
  const db = client.db("Reserv");
  var eventObjectId = new ObjectId(EventID);

  const update = await db
    .collection("Events")
    .deleteOne({ EventID: eventObjectId });
  res.status(200).json(update);
});

app.post("/api/RetrieveRooms", async (req, res) => {
  const { Latitude, Longitude } = req.body;
  var roomListReturn = {};
  console.log(Latitude);

  const db = client.db("Reserv");
  const building = await db
    .collection("Building")
    .findOne({ Latitude: Latitude, Longitude: Longitude });

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
  const roomList = await db
    .collection("Room")
    .find({ BuildingID: responseObject.BuildingID.toString() })
    .toArray();

  roomList.forEach((room) => {
    returnArray.push({
      RoomID: room.RoomID,
      RoomNumber: room.RoomNumber,
      RoomInfo: room.RoomInfo,
      MediaEquip: room.MediaEquip,
      RoomType: room.RoomType,
      Date: room.Date,
      ResrveTimes: room.ResrveTimes,
      UniID: room.UniID,
      BuildingID: room.BuildingID,
    });

    roomListReturn = { roomList: returnArray };
  });

  res.status(200).json(roomListReturn);
});

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from Bearer

    const secretKey = process.env.SECRET_KEY;

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
  const {
    Date,
    EventName,
    EventType,
    NumAttendees,
    Description,
    AtriumOccupy,
    AtriumBuilding,
    StartEnd,
    EventAgreement,
    MediaEquip,
    RSOID,
    RoomID,
  } = req.body;

  const db = client.db("Reserv");

  // If they are not verified block them out.
  const ObjectId = require("mongodb").ObjectId;

  // Suppose you have an _id value as a string
  const idString = RSOID;

  // Validate the input, for example, check if the idString is valid
  if (!isValidId(idString)) {
    // Send a 400 Bad Request response
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // Convert the string to an ObjectId
  const id = new ObjectId(idString);

  // Fetch the document with the specified _id
  const document = await db.collection("RSO").findOne({ _id: id });

  if (document == false) {
    return res.status(400).json({ error: "RSO does not exist!" });
  }

  // Now, access the 'Verification' field from the document
  if (document.Verification == false) {
    return res.status(400).json({ error: "You have not yet been verified!" });
  }
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

  // If all checks pass, insert the event
  const newEvent = {
    Date,
    EventName,
    EventType,
    NumAttendees,
    Description,
    AtriumOccupy,
    AtriumBuilding,
    StartEnd,
    EventAgreement,
    MediaEquip,
    RSOID,
    RoomID,
  };

  try {
    const result = await db.collection("Events").insertOne(newEvent);
    return res.status(200).json({ success: true, eventId: result.insertedId });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

function isValidId(id) {
  return id && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
}

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
app.put("/api/updateRSO", async (req, res) => {
  // know what things we can change

  const updatedRSO = {
    RSOName: req.body.RSOName,
    OfficerFirstName: req.body.OfficerFirstName,
    OfficerLastName: req.body.OfficerLastName,
    Password: req.body.Password,
    Email: req.body.Email,
    Phone: req.body.Phone,
    AdvisorName: req.body.AdvisorName,
    AdvisorEmail: req.body.AdvisorEmail,
    SecondaryContactName: null,
    SecondaryContactEmail: null,
    SecondaryContactPhone: null,
    UniID: null,
    Verification: false,
  };

  const db = client.db("Reserv");

  try {
    let result = db
      .collection("RSO")
      .replaceOne({ RSOName: updatedRSO.RSOName }, updatedRSO);
    return res.status(200).json({ success: true });
  } catch (e) {
    if (res.status(400)) return res.status(400).json({ error: e.toString() });
    else return res.status(500).json({ error: e.toString() });
  }
});

app.delete("/api/deleteRSO", async (req, res) => {
  RSOName = req.body.RSOName;
  // define our db
  db = client.db("Reserv");
  // connect to a collection in the db
  try {
    let result = db.collection("RSO").deleteOne({ RSOName: RSOName });
    res.status(200).json({ operation: "successful" });
  } catch (err) {
    console.log({ error: err.toString() });
  }
  // access the document we want to delete
  // if the response status is 200, log a success

  // other wise log an error
});

app.post("/api/getRoomDetails", async (req, res) => {
  const roomID = req.body.RoomID;
  const RoomNumber = req.body.RoomNumber;
  console.log(RoomNumber);

  let error = "";

  try {
    const db = client.db("Reserv");
    let room = await db.collection("Room").findOne({ RoomNumber: RoomNumber });
    return res.status(200).json(room);
  } catch (e) {
    error = e.toString();
  }

  return res.json({ error: error });
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
