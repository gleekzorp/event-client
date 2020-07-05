import React from 'react';
import { Link } from 'react-router-dom';

const EventNoLongerExists = () => {
    return (
        <div>
            <h1>I'm sorry that event no longer exists</h1>
            <Link to="/">HEAD BACK HOME</Link>
        </div>
    );
}
 
export default EventNoLongerExists;