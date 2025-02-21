const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));

// MongoDB Connection URI
const uri = 'mongodb+srv://jaferjavi:javisammu@cluster0.u2h3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        
        console.error('Error connecting to MongoDB:', err);
    }
}

connectDB();

app.post('/register', async (req, res) => {
    const { name, email, payment, faceData } = req.body;

    if (!name || !email || !faceData) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        const database = client.db('eventBooking'); // Replace with your database name
        const registrations = database.collection('registrations'); // Replace with your collection name

        await registrations.insertOne({
            name,
            email,
            payment,
            faceData,
        });

        // Save face image
        const base64Data = faceData.replace(/^data:image\/png;base64,/, '');
        const imagePath = path.join(__dirname, 'faces', ${email}.png);

        if (!fs.existsSync(path.join(__dirname, 'faces'))) {
            fs.mkdirSync(path.join(__dirname, 'faces'));
        }

        fs.writeFile(imagePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to save face image.');
            }

            res.send(Registration successful for ${name}.);
        });
    } catch (err) {
        console.error('Error saving registration:', err);
        res.status(500).send('Failed to save registration.');
    }
});

app.listen(port, () => {
    console.log(Server listening at http://localhost:${port});
});
console.log("Test");
