export default (militaryTime) => {
  let hours = militaryTime.split(":").shift();
  let minutes = militaryTime.split(":").pop();
  let AmOrPm = Number(hours) >= 12 ? Number(hours) === 24 ? "am" : "pm" : 'am';
  hours = (hours % 12) || 12;
  let finalTime = `${hours}:${minutes} ${AmOrPm}` 
  return finalTime
}