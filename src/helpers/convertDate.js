import moment from 'moment'

export default (date) => {
  return moment(date).format("dddd, MMMM Do YYYY")
}