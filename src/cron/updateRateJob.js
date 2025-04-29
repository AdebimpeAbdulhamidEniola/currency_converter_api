import cron from "node-cron"
import {getExchangeRates} from "../services/fetchAndStoreRates.js"

cron.schedule("17 6 * * *", async () => {    
    try {
        await fetchAndStoreRates();
        console.log("Exchange rates updated successfully");
    } catch (error) {
        console.error("Error updating exchange rates", error);
    }
});
