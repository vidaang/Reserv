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
    test('PUT /api/createRSO', async () => {

        const requestBody = {
            RSOID: new ObjectId(),
            Email: "unitTest",
            Password: "unitTest",
            RSOName: "unitTest",
            OfficerFirstName: "unitTest",
            OfficerLastName: "unitTest",
            OfficerEmail: "unitTest",
            Phone: "unitTest",
            AdvisorName: "unitTest",
            AdvisorEmail: "unitTest",
            SecondaryContactName: "unitTest",
            SecondaryContactEmail: "unitTest",
            SecondaryContactPhone: "unitTest",
            EmailVerification: false,
            Verification: false,
            UniID: new ObjectId(UniID),
        }

        const response = await request(app)
            .put('/api/createRSO')
            .send(requestBody);

        expect(response.statusCode).toBe(200);
        // additional assertions
    });

    // Other CRUD operations tests
});
