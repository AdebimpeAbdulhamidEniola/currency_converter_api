import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const OXR_APP_ID =  process.env.OXR_APP_ID

export default async() => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${OXR_APP_ID}`
    const response = await axios.get(url)
    return response.data
}

