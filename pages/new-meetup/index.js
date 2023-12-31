import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const NewMeetup = () => {

    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to Send Request to API');
        }
        const data = await response.json();

        router.push('/');


    }

    return (
        <Fragment>
            <Head>
                <title>Add Meetup!</title>
                <meta name="description" content="Add new Meetuo of your choice" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetup;