import React from 'react';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationContainer = () => {
    return (
        <nav>
            <ul className="container nav-items-wrapper">
                <li className="nav-item-wrapper">
                    <NavLink
                        exact
                        to="/"
                        className="nav-item"
                    >
                        <FontAwesomeIcon icon={["far", "star"]} className='nav-icon'/>
                        EVENTS
                    </NavLink>
                </li>
                <li className="nav-item-wrapper">
                    <NavLink
                        to="/create-event"
                        className="nav-item"
                    >
                        CREATE EVENT
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
 
export default NavigationContainer;