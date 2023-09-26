import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";


// const DUMMT_MEETUPS = [
//     {
//         id: 'm1',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         title: 'First Meetup',
//         address: 'Some Address, Street # 5, Lahore',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         title: 'First Meetup',
//         address: 'Some Address, Street # 5, Lahore',
//         description: 'This is a second meetup!'
//     }
// ];

const HomePage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>React-Mongo App</title>
                <meta name="description" content="Building React App wit Mongo DB" />
            </Head>
            <MeetupList meetups={props.meetups} />

        </Fragment>
    )

}

export const getStaticProps = async () => {

    const client = await MongoClient.connect('mongodb+srv://zhaider959:HpjdODemw3LK8RDc@cluster0.uql95b0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address
            }))
        }
    }
}

export default HomePage;

