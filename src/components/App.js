import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import '../styles/main.scss';
import Icons from "../helpers/icons";
import Home from './pages/Home';
import NavigationContainer from './navigation/NavigationContainer';
import NoMatch from './pages/NoMatch';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import EventNoLongerExists from './pages/EventNoLongerExists';
import EditEvent from './pages/EditEvent';
import EditEventForm from './event/EditEventForm';

const App = () => {
  Icons()
  return (
    <Router>
      <NavigationContainer />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/create-event" component={CreateEvent}/>
        <Route path="/edit-event/:slug" component={EditEventForm}/>
        <Route path="/event-details/:slug" component={EventDetails}/>
        <Route exact path="/event-no-longer-exists" component={EventNoLongerExists}/>
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default App;
