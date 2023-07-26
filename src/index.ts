import axios from 'axios';


const GOOGLE_API_KEY = 'AIzaSyAY5j8jNfrrHJsjEW3QCPgezFgIO0auXeQ'

// @ts-ignore - travelLog is not used yet
export async function main(travelLog: string[]): Promise<number> {

  let totalDistance = 0
  let index = 0;
  //basically logic I went over at the end of the interview
  //looping until there is no more of next index
  while(travelLog[index + 1] !== undefined){
    // i got rid of the both consts and just put both origin and destination in the url, i dont think it worsens much the readability
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${travelLog[index]}&destinations=${travelLog[index + 1]}&key=${GOOGLE_API_KEY}`;
  //getting the raw data from the api
  const rawDistance = await axios(url);
    //adding little grace in case the api fails
    if(rawDistance.data.status !== 'OK'){
      throw new Error('Google API Error, check your API key or your input');
    } else if (typeof rawDistance.data.rows[0].elements[0].distance.text !== "string"){
      throw new Error('Google API Error, location not found, check your coordinates');
    }
  //getting the distance in miles and converting it to a number
  const miles = +(rawDistance.data.rows[0].elements[0].distance.text).substring(0, rawDistance.data.rows[0].elements[0].distance.text.length - 3);
  //converting miles to meters
  const meters = (miles * 1609.34).toFixed(2);
  //adding up each interation of the loop
  totalDistance += Number(meters);

  // just adding index to avoid infinite loop and properly loop through the array
    index++
  }
// console.log(totalDistance)
  return totalDistance
}
main(['New York, NY, USA', 'San Francisco, CA, USA']);