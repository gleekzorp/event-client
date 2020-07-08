import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:5000/api/events/'
  baseURL: 'https://df-event-api.herokuapp.com/api/events/'
})