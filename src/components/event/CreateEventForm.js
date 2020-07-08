// TODO: Make Location use google map api
// TODO: Handle errors
// TODO: Handle form validation
// TODO: Make the functionality more like gitKrakens glowboards tasklist
// TODO: When you add a new refreshment and you want to get rid of the first one you can't since I don't let you get rid of the first.  Maybe you can get rid of the text at least
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import api from '../../helpers/api';

const CreateEventForm = (props) => {
    const [eventName, setEventName] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const [refreshments, setRefreshments] = useState([{refreshmentName: ""}])

    const handleAddRefreshmentInput = () => {
        setRefreshments([...refreshments, {refreshmentName: ""}])
    }

    const handleRemoveRefreshmentInput = (idx) => {
        if (idx === 0) return
        const list = [...refreshments];
        list.splice(idx, 1);
        setRefreshments(list);
    }

    const handleRefreshmentValueChange = (e) => {
        const index = e.target.name
        const prevRefreshments = [...refreshments]
        prevRefreshments[index].refreshmentName = e.target.value;
        setRefreshments(prevRefreshments)
    }

    const handleRefreshmentValueIsEmptyOnSubmit = (refreshments) => {
        return refreshments.filter((refreshment) => {
            return refreshment.refreshmentName !== ""
        })
    }

    const handleOnKeyPress = async (event) => {
        if (event.target.id.includes('refreshment') && event.key === "Enter") {
            event.preventDefault();
            event.persist()
            await handleAddRefreshmentInput()
            event.target.parentElement.nextSibling.childNodes[1].focus()
        } else if (event.target.type !== 'textarea' && event.key === "Enter") {
            event.preventDefault();
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        api(
            {
                method: 'post',
                url: 'add-event',
                data: {
                    eventName: eventName,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    location: location,
                    description: description,
                    createdBy: createdBy,
                    refreshments: handleRefreshmentValueIsEmptyOnSubmit(refreshments)
                }
            }
        ).then(res => {
            props.handleSuccessfulSubmit(res.data._id)
            console.log(res)
        })
        .catch(err => {
            console.log('handleSubmit Error: ', err)
        })
    }
    return (
        <form
            onSubmit={handleSubmit}
            onKeyPress={handleOnKeyPress}
            className="create-event-form"
        >
            <div className="form-group-wrapper">
                <label htmlFor="eventName">EVENT NAME:</label>
                <input
                    type="text"
                    placeholder="Event Name..."
                    name="eventName"
                    id="eventName"
                    value={eventName}
                    onChange={event => setEventName(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group-wrapper">
                <label htmlFor="eventDate">EVENT DATE:</label>
                <input
                    type="date"
                    placeholder="Event Date..."
                    name="eventDate"
                    id="eventDate"
                    value={eventDate}
                    onChange={event => setEventDate(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group-wrapper">
                <label htmlFor="eventTime">EVENT TIME:</label>
                <input
                    type="time"
                    placeholder="Event Time..."
                    name="eventTime"
                    id="eventTime"
                    value={eventTime}
                    onChange={event => setEventTime(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group-wrapper">
            <label htmlFor="location">LOCATION:</label>
                <input
                    type="text"
                    placeholder="Location..."
                    name="location"
                    id="location"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group-wrapper">
                <label htmlFor="description">DESCRIPTION:</label>
                <textarea
                    placeholder="Description..."
                    name="description"
                    id="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>

            <div className="form-group-wrapper">
                <label htmlFor="createdBy">CREATED BY:</label>
                <input
                    type="text"
                    placeholder="Created By..."
                    name="createdBy"
                    id="createdBy"
                    value={createdBy}
                    onChange={event => setCreatedBy(event.target.value)}
                    autoComplete="off"
                    required
                />
            </div>


            {
                refreshments.map((val, idx) => {
                    // const refreshmentId = `refreshment-${idx}`;
                    return (
                        <div key={`refreshment-${idx}`} className="form-group-wrapper">
                            <div className="refreshment-label-icon-wrapper">
                                <label htmlFor={`refreshment-${idx + 1}`}>{`Refreshment #${idx + 1}`}</label>
                                <div className="refreshment-icon-wrapper">
                                    <FontAwesomeIcon
                                        icon={'plus'}
                                        className="refreshment-icon"
                                        onClick={handleAddRefreshmentInput}
                                    />
                                    <FontAwesomeIcon
                                        icon={'minus'}
                                        className="refreshment-icon refreshment-icon-danger"
                                        onClick={() => handleRemoveRefreshmentInput(idx)}
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                name={idx}
                                id={`refreshment-${idx + 1}`}
                                onChange={handleRefreshmentValueChange}
                                value={refreshments[idx].refreshmentName}
                                autoComplete="off"
                                placeholder="Refreshment Name..."
                            />
                        </div>
                    );      
                })
            }
            <button type="submit" className="create-event-form-btn">CREATE</button>
        </form>
    );
}
 
export default CreateEventForm;