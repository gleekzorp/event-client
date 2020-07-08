import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import convertMilitary from '../../helpers/convertMilitary';


const UpComingEvent = (props) => {
    const { eventName, location, eventDate, eventTime, _id } = props.event
    return (
        <div className="upcoming-events-wrapper">
            <div className="upcoming-events-heading-text">
                <h2>{eventName}</h2>
            </div>
            <div className="upcoming-events-content">
                <div className="upcoming-events-content-item">
                    <div>
                        {location}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={'map-marker-alt'} className="upcoming-events-icon"/>
                    </div>
                </div>
                <div className="upcoming-events-content-item">
                    <div>
                        {eventDate}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={'calendar-alt'} className="upcoming-events-icon"/>
                    </div>
                </div>
                <div className="upcoming-events-content-item">
                    <div>
                        {convertMilitary(eventTime)}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={'clock'} className="upcoming-events-icon"/>
                    </div>
                </div>
            </div>
            <div className="upcoming-event-link-wrapper">
                <Link
                    to={`event-details/${_id}`}
                    className="upcoming-event-link"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
 
export default UpComingEvent;