import React from 'react';
import CreateEventForm from '../event/CreateEventForm';

const CreateEvent = (props) => {
    const handleSuccessfulSubmit = (id) => {
        props.history.push(`event-details/${id}`)
    }
    return (
        <div className="container">
            <h1 className="create-event-heading">Create Event</h1>
            <CreateEventForm handleSuccessfulSubmit={handleSuccessfulSubmit} />
        </div>
    );
}
 
export default CreateEvent;