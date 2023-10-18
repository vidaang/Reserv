const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
run().catch(console.dir);

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

const bcrypt = require("bcrypt"); // Assuming you're using bcrypt for hashing passwords

app.post("/api/login", async (req, res) => {
  // incoming: email, password
  // outgoing: error, token or session information

  const { email, password } = req.body;

  const db = client.db("Reserv");
  const user = await db.collection("RSO").findOne({ Email: email });

  if (!user) {
    return res.status(400).json({ error: "Email not found" });
  }

  // For when passwords are encrypted.
  //   const passwordMatches = await bcrypt.compare(password, user.Password); // Assuming the stored password is hashed using bcrypt

  //   if (!passwordMatches) {
  //     return res.status(400).json({ error: "Incorrect password" });
  //   }

  // Here you'd create a token or session for the user.
  // This can be done using libraries like jsonwebtoken or setting up a session in Express.
  // For simplicity's sake, let's just send a success message.
  res.status(200).json({ message: "Logged in successfully" });
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

app.listen(4000, () => {
  console.log("Server has started!");
}); // start Node + Express server on port 5000
