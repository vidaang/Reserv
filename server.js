const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) =>
// {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PATCH, DELETE, OPTIONS'
//     );
//     next();
// });

// app.listen(5000); // start Node + Express server on port 5000

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://BenjaminCarmenate:ELZ8g67YlurlpbRd@cardsdbcluster.zx4onxi.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

var cardList =
[
'Roy Campanella',
'Paul Molitor',
'Tony Gwynn',
'Dennis Eckersley',
'Reggie Jackson',
'Gaylord Perry',
'Buck Leonard',
'Rollie Fingers',
'Charlie Gehringer',
'Wade Boggs',
'Carl Hubbell',
'Dave Winfield',
'Jackie Robinson',
'Ken Griffey, Jr.',
'Al Simmons',
'Chuck Klein',
'Mel Ott',
'Mark McGwire',
'Nolan Ryan',
'Ralph Kiner',
'Yogi Berra',
'Goose Goslin',
'Greg Maddux',
'Frankie Frisch',
'Ernie Banks',
'Ozzie Smith',
'Hank Greenberg',
'Kirby Puckett',
'Bob Feller',
'Dizzy Dean',
'Joe Jackson',
'Sam Crawford',
'Barry Bonds',
'Duke Snider',
'George Sisler',
'Ed Walsh',
'Tom Seaver',
'Willie Stargell',
'Bob Gibson',
'Brooks Robinson',
'Steve Carlton',
'Joe Medwick',
'Nap Lajoie',
'Cal Ripken, Jr.',
'Mike Schmidt',
'Eddie Murray',
'Tris Speaker',
'Al Kaline',
'Sandy Koufax',
'Willie Keeler',
'Pete Rose',
'Robin Roberts',
'Eddie Collins',
'Lefty Gomez',
'Lefty Grove',
'Carl Yastrzemski',
'Frank Robinson',
'Juan Marichal',
'Warren Spahn',
'Pie Traynor',
'Roberto Clemente',
'Harmon Killebrew',
'Satchel Paige',
'Eddie Plank',
'Josh Gibson',
'Oscar Charleston',
'Mickey Mantle',
'Cool Papa Bell',
'Johnny Bench',
'Mickey Cochrane',
'Jimmie Foxx',
'Jim Palmer',
'Cy Young',
'Eddie Mathews',
'Honus Wagner',
'Paul Waner',
'Grover Alexander',
'Rod Carew',
'Joe DiMaggio',
'Joe Morgan',
'Stan Musial',
'Bill Terry',
'Rogers Hornsby',
'Lou Brock',
'Ted Williams',
'Bill Dickey',
'Christy Mathewson',
'Willie McCovey',
'Lou Gehrig',
'George Brett',
'Hank Aaron',
'Harry Heilmann',
'Walter Johnson',
'Roger Clemens',
'Ty Cobb',
'Whitey Ford',
'Willie Mays',
'Rickey Henderson',
'Babe Ruth'
];

app.post('/api/addcard', async (req, res, next) =>
{
    // incoming: userId, color
    // outgoing: error
    const { userId, card } = req.body;
    const newCard = {Card:card,UserId:userId};
    var error = '';

    try
    {
        const db = client.db('COP4331Cards');
        const result = await db.collection('Cards').insertOne(newCard);
    }
    catch(e)
    {
        error = e.toString();
    }

    cardList.push( card );
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/createAccount', async (req, res, next) =>
{
    // incoming: userId, color
    // outgoing: error
    const { userName, password, firstName, lastName } = req.body;
    const newUser = {Login:userName, Password:password, FirstName:firstName, LastName:lastName};
    var error = '';

    try
    {
        const db = client.db('COP4331Cards');
        const result = await db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db('COP4331Cards');
    const results = await
    db.collection('Users').find({Login:login,Password:password}).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if( results.length > 0 )
    {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    var ret = { id:id, firstName:fn, lastName:ln, error:''};
    console.log(ret);
    res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) =>
{
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.trim();

    const db = client.db('COP4331Cards');
    const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}, "UserId":userId}).toArray();
    var _ret = [];

    for( var i=0; i<results.length; i++ )
    {
        _ret.push( results[i].Card );
    }

    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
});


