import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetailsPage = (props) => {
    return (
        <Fragment>

            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>

            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
            />
        </Fragment>
    )
}

export const getStaticPaths = async () => {

    const client = await MongoClient.connect('mongodb+srv://zhaider959:HpjdODemw3LK8RDc@cluster0.uql95b0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })),
        revalidate: 1,

        // [
        //     {
        //         params: {
        //             meetupId: 'm1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2'
        //         }
        //     }
        // ]
    }
}

export const getStaticProps = async (context) => {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://zhaider959:HpjdODemw3LK8RDc@cluster0.uql95b0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();



    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.address,
            }
        }
    }
}

export default MeetupDetailsPage;