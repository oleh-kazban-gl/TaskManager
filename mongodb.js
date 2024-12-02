const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('task-manager');
        const collection = database.collection('users');
        const user = {
            firstName: 'Oleh',
            lastName: 'Kazban',
        };
        const result = await collection.insertOne(user);

        console.log(`The document has been inserted: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
