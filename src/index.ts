import axios, { AxiosResponse } from 'axios'

const GOOGLE_API_KEY = 'AIzaSyAY5j8jNfrrHJsjEW3QCPgezFgIO0auXeQ'

// @ts-ignore - travelLog is not used yet
export async function main(travelLog: string[]): Promise<number> {
  let totalDistance: number = 0
  let index: number = 0
  //basically logic I went over at the end of the interview
  try {
    //looping until there is no more of next index
    while (travelLog[index + 1] !== undefined) {
      // i got rid of the both consts and just put both origin and destination in the url, i dont think it worsens much the readability
      const url: string = `https://maps.googleapis.com/maps/api/distancematrix/json?units=meters&origins=${
        travelLog[index]
      }&destinations=${travelLog[index + 1]}&key=${GOOGLE_API_KEY}`
      //getting the raw data from the api
      const rawDistance: AxiosResponse<any, any> = await axios(url)
      //adding little grace in case the api fails
      if (rawDistance.data.status !== 'OK') {
        throw new Error(
          `Google API Error, check your API key or your input, status error: ${rawDistance.status}`,
        )
      }
      //getting the distance in miles and converting it to a number
      const miles =
        rawDistance.data.rows[0].elements[0].distance.text.substring(
          0,
          rawDistance.data.rows[0].elements[0].distance.text.length - 3,
        )
      const properFormatMeters = miles.replace(/,/, '')
      //converting miles to meters
      const meters = Number(properFormatMeters) * 1000
      //adding up each interation of the loop

      totalDistance += meters

      // just adding index to avoid infinite loop and properly loop through the array
      index++
    }
    return totalDistance
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
void main([
  'New York, NY, USA',
  '35.389,-79.1455',
  'San Francisco, CA, USA',
  '18.4796,-89.3848',
])
