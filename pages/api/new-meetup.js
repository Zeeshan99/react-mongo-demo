import { MongoClient } from "mongodb";

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://zhaider959:HpjdODemw3LK8RDc@cluster0.uql95b0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);


        client.close();

        res.status(201).json({ message: 'Meetup Inserted!' })

    }
}


export default handler;