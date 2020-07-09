import React, { useEffect } from 'react';

import EditEventForm from '../event/EditEventForm';
import api from '../../helpers/api';
import { useState } from 'react';

const EditEvent = (props) => {
  const [event, setEvent] = useState([]);
  const handleSuccessfulSubmit = (id) => {
      props.history.push(`event-details/${id}`)
  }

  useEffect(() => {
    api.get(`get-event/${props.match.params.slug}`)
    .then(res => {
      console.log(res)
      setEvent(res.data)
    })
    .catch(err => {
        console.log('fetchEvents Error: ', err)
    })
  }, [props.match.params.slug])

  return (
      <div className="container">
          <h1 className="create-event-heading">Edit Event</h1>
          <EditEventForm
            handleSuccessfulSubmit={handleSuccessfulSubmit}
            event={event}
          />
      </div>
  );
}
 
export default EditEvent;