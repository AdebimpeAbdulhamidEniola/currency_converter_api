import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const OXR_APP_ID =  process.env.OXR_APP_ID

export const latestExchange = async() => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${OXR_APP_ID}`
    const response = await axios.get(url)
    return response.data
}

//Get the data for a specific date
export const historyData = async(date) => {
    const historyUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=${OXR_APP_ID}`;
    const historicalResponse = await axios.get(historyUrl);
    return historicalResponse.data;
}
