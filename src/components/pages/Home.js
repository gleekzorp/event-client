import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UpComingEvent from '../event/UpComingEvent';

const Home = () => {
    const [events, setEvents] = useState([])
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);

    const fetchEvents = () => {
        axios.get('http://localhost:5000/api/events')
            .then(res => {
                console.log(res)
                setIsLoadingEvent(false)
                setEvents(res.data)
            })
            .catch(err => {
                console.log('fetchEvents Error: ', err)
            })
    }

    useEffect(fetchEvents, [])

    const renderEvents = () => {
        return events.map(event => {
            return <UpComingEvent key={event._id} event={event}/>
        })
    }
    return (
        <div className="home-wrapper">
            <div className="container">
                <h1 className="home-heading-text">Upcoming Events:</h1>
                {isLoadingEvent ? (
                    <div className="spinner-wrapper">
                        <FontAwesomeIcon
                            icon="spinner"
                            spin
                            className="big-spinner"
                        />
                    </div>
                ) : (
                    renderEvents()
                )}
            </div>
        </div>
    );
}
 
export default Home;