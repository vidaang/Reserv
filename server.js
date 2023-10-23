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
// -------------- Boiler Plate Code from MERN Stack Demo--------------- //

var cardList = [
  "Roy Campanella",
  "Paul Molitor",
  "Tony Gwynn",
  "Dennis Eckersley",
  "Reggie Jackson",
  "Gaylord Perry",
  "Buck Leonard",
  "Rollie Fingers",
  "Charlie Gehringer",
  "Wade Boggs",
  "Carl Hubbell",
  "Dave Winfield",
  "Jackie Robinson",
  "Ken Griffey, Jr.",
  "Al Simmons",
  "Chuck Klein",
  "Mel Ott",
  "Mark McGwire",
  "Nolan Ryan",
  "Ralph Kiner",
  "Yogi Berra",
  "Goose Goslin",
  "Greg Maddux",
  "Frankie Frisch",
  "Ernie Banks",
  "Ozzie Smith",
  "Hank Greenberg",
  "Kirby Puckett",
  "Bob Feller",
  "Dizzy Dean",
  "Joe Jackson",
  "Sam Crawford",
  "Barry Bonds",
  "Duke Snider",
  "George Sisler",
  "Ed Walsh",
  "Tom Seaver",
  "Willie Stargell",
  "Bob Gibson",
  "Brooks Robinson",
  "Steve Carlton",
  "Joe Medwick",
  "Nap Lajoie",
  "Cal Ripken, Jr.",
  "Mike Schmidt",
  "Eddie Murray",
  "Tris Speaker",
  "Al Kaline",
  "Sandy Koufax",
  "Willie Keeler",
  "Pete Rose",
  "Robin Roberts",
  "Eddie Collins",
  "Lefty Gomez",
  "Lefty Grove",
  "Carl Yastrzemski",
  "Frank Robinson",
  "Juan Marichal",
  "Warren Spahn",
  "Pie Traynor",
  "Roberto Clemente",
  "Harmon Killebrew",
  "Satchel Paige",
  "Eddie Plank",
  "Josh Gibson",
  "Oscar Charleston",
  "Mickey Mantle",
  "Cool Papa Bell",
  "Johnny Bench",
  "Mickey Cochrane",
  "Jimmie Foxx",
  "Jim Palmer",
  "Cy Young",
  "Eddie Mathews",
  "Honus Wagner",
  "Paul Waner",
  "Grover Alexander",
  "Rod Carew",
  "Joe DiMaggio",
  "Joe Morgan",
  "Stan Musial",
  "Bill Terry",
  "Rogers Hornsby",
  "Lou Brock",
  "Ted Williams",
  "Bill Dickey",
  "Christy Mathewson",
  "Willie McCovey",
  "Lou Gehrig",
  "George Brett",
  "Hank Aaron",
  "Harry Heilmann",
  "Walter Johnson",
  "Roger Clemens",
  "Ty Cobb",
  "Whitey Ford",
  "Willie Mays",
  "Rickey Henderson",
  "Babe Ruth",
];

app.post("/api/addcard", async (req, res, next) => {
  // incoming: userId, color
  // outgoing: error
  const { userId, card } = req.body;
  const newCard = { Card: card, UserId: userId };
  var error = "";

  try {
    const db = client.db("COP4331Cards");
    const result = db.collection("Cards").insertOne(newCard);
  } catch (e) {
    error = e.toString();
  }

  cardList.push(card);
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post("/api/searchcards", async (req, res) => {
  // incoming: userId, search
  // outgoing: results[], error
  var error = "";
  const { userId, search } = req.body;
  var _search = search.trim();

  const db = client.db("COP4331Cards");
  const results = await db
    .collection("Cards")
    .find({ Card: { $regex: _search + ".*", $options: "i" }, UserId: userId })
    .toArray();
  var _ret = [];

  for (var i = 0; i < results.length; i++) {
    _ret.push(results[i].Card);
  }

  var ret = { results: _ret, error: error };
  res.status(200).json(ret);
});

//----------------------------------------------
