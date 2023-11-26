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

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { env } = require("process");

app.put("/api/createRSO", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const db = client.db("Reserv");

    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

    const newRSO = {
      RSOID: new ObjectId(),
      Email: Email,
      Password: hashedPassword,
      RSOName: "",
      OfficerFirstName: "",
      OfficerLastName: "",
      OfficerEmail: "",
      Phone: "",
      AdvisorName: "",
      AdvisorEmail: "",
      SecondaryContactName: "",
      SecondaryContactEmail: "",
      SecondaryContactPhone: "",
      EmailVerification: false,
      Verification: false,
      UniID: new ObjectId(req.body.UniID),
    };

    await db.collection("RSO").insertOne(newRSO);

    return res.status(201).json({ success: true, message: "RSO created successfully" });
  } catch (e) {
    console.error("Error during createAdmin:", e);
    return res.status(500).json({ success: false, error: "Failed to create account" });
  }
});

app.post("/api/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const db = client.db("Reserv");
    const rso = await db.collection("RSO").findOne({ Email: Email });

    if (!rso) {
      return res.status(400).json({ error: "RSO does not exist! Please make an account." });
    }

    // Check if the email is verified
    if (!rso.EmailVerification) {
      return res.status(400).json({ error: "Email is not verified. Please verify your email." });
    }

    const passwordMatch = await bcrypt.compare(Password, rso.Password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const jwtPayload = {
      RSOID: rso.RSOID,
    };

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

  // Construct response JSON object
  const responseObject = {
    token: token,
    RSOID: rso.RSOID,
    UniID: rso.UniID,
  };

    res.status(200).json(responseObject);
  } catch (e) {
    console.error("Error during adminLogin:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/checkRSOFields", async (req, res) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the RSOID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const RSOID = decodedToken.RSOID;

    // Fetch the rso from the database based on RSOID
    const db = client.db("Reserv");
    const rso = await db.collection("RSO").findOne({ RSOID: new ObjectId(RSOID) });

    if (!rso) {
      return res.status(400).json({ error: "RSO not found" });
    }

    // Check if all fields are not empty
    const fieldsNotEmpty = Object.values(rso).every(field => field !== "");

    res.status(200).json({ fieldsNotEmpty });
  } catch (error) {
    console.error("Error during checkFieldsNotEmpty:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updateRSOInfo", async (req, res) => {
  const update = {
    RSOName: req.body.RSOName,
    OfficerFirstName: req.body.OfficerFirstName,
    OfficerLastName: req.body.OfficerLastName,
    OfficerEmail: req.body.OfficerEmail,
    Phone: req.body.Phone,
    AdvisorName: req.body.AdvisorName,
    AdvisorEmail: req.body.AdvisorEmail,
    SecondaryContactName: req.body.SecondaryContactName,
    SecondaryContactEmail: req.body.SecondaryContactEmail,
    SecondaryContactPhone: req.body.SecondaryContactPhone,
  };

  const db = client.db("Reserv");

  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the RSOID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const RSOID = decodedToken.RSOID;
    console.log(RSOID);

    let result = await db.collection("RSO").updateOne(
      { RSOID: new ObjectId(RSOID) },
      { $set: update }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      console.log("No log");
      return res.status(400).json({ error: "No document updated. RSOID may not exist." });
    }
  } catch (error) {
    console.error("Error during updateRSOInfo:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/RetrieveEvents", async (req, res) => {

  const { RSOID } = req.body;
  var eventListReturn = {};

  const db = client.db("Reserv");
  const returnArray = [];
  var eventList;

  if (RSOID == undefined)
  {
    eventList = await db
    .collection("Events")
    .find({})
    .toArray();
  }
  else
  {
    eventList = await db
    .collection("Events")
    .find({ RSOID: RSOID })
    .toArray();
  }

  eventList.forEach((event) => {
    returnArray.push({
      EventID: event._id,
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

app.post("/api/RetrieveEventsMobile", async (req, res) => {
  var eventListReturn = {};

  const db = client.db("Reserv");

  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the RSOID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const RSOID = decodedToken.RSOID;
    console.log(RSOID);

    const returnArray = [];
    var eventList;

    if (RSOID) {
      eventList = await db
        .collection("Events")
        .find({ RSOID: new ObjectId(RSOID) })
        .toArray();
    } else {
      eventList = [];  // Set eventList to an empty array when RSOID is not present
    }

    eventList.forEach((event) => {
      returnArray.push({
        EventID: event._id,
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
  } catch (error) {
    console.error("Error during RetrieveEvents:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/RetrieveRSO", async (req, res) => {
  const { UniID, VerificationFlag } = req.body;
  var RSOListReturn = {};
  var uniObjectID = new ObjectId(UniID);


  const db = client.db("Reserv");
  const returnArray = [];
  const RSOList = await db
    .collection("RSO")
    .find({ UniID: uniObjectID, Verification: VerificationFlag })
    .toArray();
  console.log(RSOList);

  RSOList.forEach((rso) => {
    returnArray.push({
      AdminID: rso.AdminID,
      AdvisorEmail: rso.advisorEmail,
      AdvisorName: rso.AdvisorName,
      Email: rso.Email,
      Phone: rso.Phone,
      OfficerFirstName: rso.OfficerFirstName,
      OfficerLastName: rso.OfficerLastName,
      RSOID: rso._id,
      RSOName: rso.RSOName,
      UniID: rso.UniID,
      Verification: rso.Verification,
    });

    RSOListReturn = { RSOList: returnArray };
  });

  res.status(200).json(RSOListReturn);
});

app.put("/api/UpdateEvent", async (req, res) => {
  const { EventID, EventName, Description } = req.body;
  const db = client.db("Reserv");
  var eventObjectId = new ObjectId(EventID);

  const update = await db
    .collection("Events")
    .updateOne(
      { _id: eventObjectId },
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
    .deleteOne({ _id: eventObjectId });
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

  var returnArray = [];
  var roomList;

  if (building == undefined) {
    roomList = await db.collection("Room").find({}).toArray();
  } else {
    // Construct response JSON object
    const responseObject = {
      // token: token, // remeber to add JWT
      BuildingID: building.BuildingID,
      BuildingName: building.BuildingName,
      Latitude: building.Latitude,
      Longitude: building.Longitude,
      UniID: building.UniID,
    };
    roomList = await db
      .collection("Room")
      .find({ BuildingID: responseObject.BuildingID.toString() })
      .toArray();
  }

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
      Capacity: room.Capacity,
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
        console.error('JWT Verification Error:', err);
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

app.put("/api/createEventMobile", authenticateJWT, async (req, res) => {
  const newEvent = {
    Date: req.body.Date,
    EventName: req.body.EventName,
    EventType: req.body.EventType,
    NumAttendees: req.body.NumAttendees,
    Description: req.body.Description,
    AtriumOccupy: req.body.AtriumOccupy,
    AtriumBuilding: req.body.AtriumBuilding,
    StartEnd: req.body.StartEnd,
    EventAgreement: req.body.EventAgreement,
    MediaEquip: req.body.MediaEquip,
    RoomID: req.body.RoomID,
    BuildingID: req.body.BuildingID,
    RoomNumber: req.body.RoomNumber,
  };

  const db = client.db("Reserv");

  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the RSOID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const RSOID = decodedToken.RSOID;
    console.log(RSOID);

    let rso = await db.collection("RSO").findOne({ RSOID: new ObjectId(RSOID) });

    if (rso == null) {
      return res.status(400).json({ error: "RSO does not exist!" });
    }

    try {
      const result = await db.collection("Events").insertOne({
        ...newEvent,
        RSOID: new ObjectId(RSOID),
      });
      return res.status(200).json({ success: true, eventId: result.insertedId });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  } catch (error) {
    console.error("Error during createEventMobile", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
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

//----------------------------UNIVERSITY ENDPOINTS----------------------------//
app.put("/api/createAdmin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const db = client.db("Reserv");

    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

    const newUniversity = {
      UniID: new ObjectId(),
      Email: Email,
      Password: hashedPassword,
    };

    await db.collection("Admin").insertOne(newUniversity);

    const universityData = {
      UniID: newUniversity.UniID,
      UniName: "",
      Address: "",
      EmailDomain: "",
      Website: "",
      Phone: "",
    };
    await db.collection("University").insertOne(universityData);

    return res.status(201).json({ success: true, message: "Admin and University created successfully" });
  } catch (e) {
    console.error("Error during createAdmin:", e);
    return res.status(500).json({ success: false, error: "Failed to create account" });
  }
});

app.post("/api/adminLogin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const db = client.db("Reserv");
    const uni = await db.collection("Admin").findOne({ Email: Email });

    if (!uni) {
      return res.status(400).json({ error: "University does not exist! Please make an account." });
    }

    // Check if the email is verified
    if (!uni.EmailVerification) {
      return res.status(400).json({ error: "Email is not verified. Please verify your email." });
    }

    const passwordMatch = await bcrypt.compare(Password, uni.Password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const jwtPayload = {
      UniID: uni.UniID,
    };

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(jwtPayload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

    const responseObject = {
      token: token,
      UniID: uni.UniID,
      Email: uni.Email,
    };

    res.status(200).json(responseObject);
  } catch (e) {
    console.error("Error during adminLogin:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/checkUniFields", async (req, res) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the UniID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const UniID = decodedToken.UniID;

    // Fetch the university from the database based on UniID
    const db = client.db("Reserv");
    const uni = await db.collection("University").findOne({ UniID: new ObjectId(UniID) });

    if (!uni) {
      return res.status(400).json({ error: "University not found" });
    }

    // Check if all fields are not empty
    const fieldsNotEmpty = Object.values(uni).every(field => field !== "");

    res.status(200).json({ fieldsNotEmpty });
  } catch (error) {
    console.error("Error during checkFieldsNotEmpty:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updateUniversityInfo", async (req, res) => {
  const update = {
    UniName: req.body.UniName,
    Address: req.body.Address,
    EmailDomain: req.body.EmailDomain,
    Website: req.body.Website,
    Phone: req.body.Phone,
  };

  const db = client.db("Reserv");

  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token not provided" });
  }

  try {
    // Decode the token to get the UniID
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const UniID = decodedToken.UniID;

    let result = await db.collection("University").updateOne(
      { UniID: new ObjectId(UniID) },
      { $set: update }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "No document updated. UniID may not exist." });
    }
  } catch (error) {
    console.error("Error during updateUniversityInfo:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/VerifyRSO", async (req, res) => {
  const { RSOID } = req.body;
  const db = client.db("Reserv");
  var rsoObjectID = new ObjectId(RSOID);

  const update = await db
    .collection("RSO")
    .updateOne({ RSOID: rsoObjectID }, { $set: { Verification: true } });
  res.status(200).json(update);
});

app.post("/api/updateUniversityLogin", async (req, res) => {
  const { Email, Password } = req.body;

  const update = {
    Email: Email,
  };

  if (Password) {
    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds
    update.Password = hashedPassword;
  }

  const db = client.db("Reserv");

  try {
    let result = await db.collection("Admin").updateOne(
      { UniID: new ObjectId(req.body.UniID) },
      { $set: update }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "No document updated. UniID may not exist." });
    }
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

app.post("/api/checkVerification", async (req, res) => {
  try {
    const db = client.db("Reserv");
    const RSOName = req.body.RSOName;

    const rso = await db.collection("RSO").findOne({ RSOName: RSOName });

    if (rso) {
      return res.status(200).json({ result: rso.Verification === true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

// app.put("/api/DeleteUniversity", async (req, res) => {
//   const db = client.db("Reserv");

//   try {
//     const object = new ObjectId(req.body.UniID);

//     // Define collections to delete documents from
//     const collectionsToDelete = [
//       { name: "Admin", method: "deleteOne" },
//       { name: "University", method: "deleteOne" },
//       { name: "Room", method: "deleteMany" },
//       { name: "RSO", method: "deleteMany" },
//       { name: "Events", method: "deleteMany" },
//       { name: "Building", method: "deleteMany" },
//     ];

//     let totalDeletedCount = 0;

//     for (const collection of collectionsToDelete) {
//       const result = await db.collection(collection.name)[collection.method]({ UniID: object });
//       // console.log(`${collection.name} Collection Deletion Result:`, result);
//       totalDeletedCount += result.deletedCount || 0;
//     }

//     if (totalDeletedCount > 0) {
//       return res.status(200).json({ success: true, message: "University and related items deleted successfully" });
//     } else {
//       return res.status(404).json({ success: false, message: "No matching documents found for deletion" });
//     }
//   } catch (e) {
//     console.error("Error during DeleteUniversity:", e);
//     return res.status(500).json({ success: false, error: e.message });
//   }
// });

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
