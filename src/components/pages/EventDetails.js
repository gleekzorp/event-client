// TODO: Is it best to push users to a event-no-longer-exists page or just have a ternary in the return
// TODO: Create a modal to open after the user pushes delete to ask if they want to delete or cancel
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RefreshmentDetails from '../event/RefreshmentDetails';
import api from '../../helpers/api';
import convertMilitary from '../../helpers/convertMilitary';
import convertDate from '../../helpers/convertDate';

const EventDetails = (props) => {
    const [event, setEvent] = useState([])
    const [refreshments, setRefreshments] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);
    const [isLoadingEditDelete, setIsLoadingEditDelete] = useState(false);

    const fetchEvent = () => {
        api.get(`get-event/${props.match.params.slug}`)
            .then(res => {
                if (res.data === null) {
                    props.history.push('/event-no-longer-exists')
                } else {
                    console.log(res)
                    setIsLoadingEvent(false)
                    setEvent(res.data)
                    setRefreshments(res.data.refreshments)
                }
            })
            .catch(err => {
                props.history.push('/event-no-longer-exists')
                console.log('fetchEvents Error: ', err)
            })
    }

    const handleSuccessfulEditTakenBy = (updatedEvent) => {
        setEvent(updatedEvent)
        setRefreshments(updatedEvent.refreshments)
    }

    useEffect(fetchEvent, [])

    const renderRefreshments = () => {
        return refreshments.map(refreshment => {
            return (
                <RefreshmentDetails
                    key={refreshment._id}
                    refreshment={refreshment}
                    handleSuccessfulEditTakenBy={handleSuccessfulEditTakenBy}
                />
            )
        })
    }

    const handleDeleteEvent = () => {
        setIsLoadingEditDelete(true)
        api.delete(`delete-event/${props.match.params.slug}`)
            .then(res => {
                if (res.data === "Event Deleted!") {
                    props.history.push('/')
                } else {
                    console.log('handleDeleteEvent Error: ', res)
                }
            })
            .catch(err => {
                setIsLoadingEditDelete(false)
                setErrorMessage('Error Deleting.  Please Try Again')
                console.log('handleDeleteEvent Error: ', err)
            })
    }

    const handleEditEvent = () => {
        console.log('handleeditevent')
    }

    return (
        <div className="event-details">
            {isLoadingEvent ? (
                <div className="spinner-wrapper">
                    <FontAwesomeIcon
                        icon="spinner"
                        spin
                        className="big-spinner"
                    />
                </div>
            ) : (
                <div className="container">
                    <div className="event-details-wrapper">
                        <div className="event-details-heading">
                            <h1>{event.eventName}</h1>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'calendar-alt'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Date:</div>
                            </div>
                            <div className="event-details-content">{convertDate(event.eventDate)}</div>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'clock'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Time:</div>
                            </div>
                            {/* <div className="event-details-content">{event.eventTime}</div> */}
                            <div className="event-details-content">{event.eventTime ? convertMilitary(event.eventTime) : null}</div>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'map-marker-alt'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Event Location:</div>
                            </div>
                            <div className="event-details-content">{event.location}</div>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'info-circle'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Event Description:</div>
                            </div>
                            <div className="event-details-content">{event.description}</div>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'user'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Created By:</div>
                            </div>
                            <div className="event-details-content">{event.createdBy}</div>
                        </div>
                        <div className="event-details-item">
                            <div className="event-details-item-heading-wrapper">
                                <FontAwesomeIcon icon={'users'} className="event-details-icon"/>
                                <div className="event-details-item-heading-text">Total Attendees:</div>
                            </div>
                            <div className="event-details-content">{event.totalAttendees}</div>
                        </div>
                    </div>
                    <div className="event-details-item">
                        <div className="event-details-item-heading-wrapper">
                            <FontAwesomeIcon icon={'utensils'} className="event-details-icon"/>
                            <div className="event-details-item-heading-text">Refreshments:</div>
                        </div>
                        <div className="event-details-content">
                            {renderRefreshments()}
                        </div>
                    </div>
                    <div className="event-details-edit-delete-wrapper">
                        {isLoadingEditDelete ? (
                            <div className="spinner-wrapper">
                                <FontAwesomeIcon
                                    icon="spinner"
                                    spin
                                    className="small-spinner"
                                />
                            </div>
                            ) : (
                            <>
                                <button className="event-details-btn" onClick={handleEditEvent}>
                                    EDIT EVENT
                                </button>
                                <button className="event-details-btn danger" onClick={handleDeleteEvent}>
                                    DELETE EVENT
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="error">{errorMessage}</div>
        </div>
    );
}
 
export default EventDetails;