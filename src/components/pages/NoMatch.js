import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div>
            <Link to="/">This page doesn't exist... Go Back Home</Link>
        </div>
    );
}
 
export default NoMatch;