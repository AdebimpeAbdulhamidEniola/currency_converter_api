import cron from "node-cron"
import {getExchangeRates} from "../controllers/exchangeRatesController.js"

cron.schedule("04 01 * * *", async () => {    
    try {
        await getExchangeRates();
        console.log("Exchange rates updated successfully");
    } catch (error) {
        console.error("Error updating exchange rates", error);
    }
});
