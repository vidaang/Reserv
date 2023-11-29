const request = require('supertest');
const app = require('./server'); // Import your Express app
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let client;
let db;

jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn().mockResolvedValue({}),
}));


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect the client to the server
    await client.connect();

    // Get the database from the client
    db = client.db();
});

afterAll(async () => {
    await client.close();
    await mongoServer.stop();
    // disconnect from in-memory MongoDB
});

describe('API Tests', () => {
    test('GET /api/GetUniInfo', async () => {

        const requestBody = {
            "UniversityID": new ObjectId("6566be76dd46c9561a7f8419")
        }

        const response = await request(app).post('/api/getUniInfo').send(requestBody)

        expect(response.statusCode).toBe(200);
        expect(response.body.UniName).toBe("unitTest");
        expect(response.body.Address).toBe("unitTest");
        expect(response.body.EmailDomain).toBe("unitTest");
        expect(response.body.Website).toBe("unitTest");
        expect(response.body.Phone).toBe("unitTest");
        // additional assertions
    });

    test('GET /api/RetrieveBuildings', async () => {
        const requestBody = {
            "Latitude": 0,
            "Longitude": 0
        }

        const response = await request(app).post('/api/RetrieveRooms').send(requestBody)
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.roomList[0].RoomNumber).toBe(0)
        expect(response.body.roomList[0].RoomType).toBe("unitTest")
        expect(response.body.roomList[0].RoomInfo).toBe("unitTest")
        expect(response.body.roomList[0].UniID).toBe("6566be76dd46c9561a7f8419")

    })

    test('GET /api/MultipleRetrieveBuildings', async () => {
        const requestBody = {
            "Latitude": 0,
            "Longitude": 0
        }

        const response = await request(app).post('/api/RetrieveRooms').send(requestBody)
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.roomList[1].RoomNumber).toBe(1)
        expect(response.body.roomList[1].RoomType).toBe("unitTest")
        expect(response.body.roomList[1].RoomInfo).toBe("unitTest")
        expect(response.body.roomList[1].UniID).toBe("6566be76dd46c9561a7f8419")
        expect(response.body.roomList[0].RoomNumber).toBe(0)
        expect(response.body.roomList[0].RoomType).toBe("unitTest")
        expect(response.body.roomList[0].RoomInfo).toBe("unitTest")
        expect(response.body.roomList[0].UniID).toBe("6566be76dd46c9561a7f8419")

    })

    test('GET /api/RetrieveRSO', async () => {
        const requestBody = {
            "UniID": new ObjectId("6566be76dd46c9561a7f8419"),
            "VerificationFlag": true,
            "RSOID": new ObjectId("6566c87593b9080ff570c2e1")
        }

        const response = await request(app).post('/api/RetrieveRSO').send(requestBody)
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.Phone).toBe("UnitTest")
        expect(response.body.RSOName).toBe("UnitTest")

    })

    test('GET /api/RetrieveEvents', async () => {
        const requestBody = {
            "RSOID": new ObjectId("6566c87593b9080ff570c2e1")
        }

        const response = await request(app).post('/api/RetrieveEvents').send(requestBody)
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.eventList[0].EventName).toBe("UnitTest")
        expect(response.body.eventList[0].EventType).toBe("UnitTest")

    })

    test('GET /api/MultipleRetrieveEvents', async () => {
        const requestBody = {
            "RSOID": new ObjectId("6566c87593b9080ff570c2e1")
        }

        const response = await request(app).post('/api/RetrieveEvents').send(requestBody)
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.eventList[0].EventName).toBe("UnitTest")
        expect(response.body.eventList[0].EventType).toBe("UnitTest")
        expect(response.body.eventList[1].EventName).toBe("Unit Test")
        expect(response.body.eventList[1].EventType).toBe("Unit Test")

    })


    // Other CRUD operations tests
});
