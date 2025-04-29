import cron from "node-cron"
import {fetchAndStoreRates} from "../services/fetchAndStoreRates.js"

cron.schedule("18 6 * * *", async () => {    
    try {
        await fetchAndStoreRates();
        console.log("Exchange rates updated successfully");
    } catch (error) {
        console.error("Error updating exchange rates", error);
    }
});
