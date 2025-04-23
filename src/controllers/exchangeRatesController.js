import { saveExchangeRate } from "../models/exchangeRateModel.js";
import redisClient from "../config/redisClient.js";
import { latestExchange } from "../services/openExchangeRateServices.js";


export const getExchangeRates = async (req, res, next) => {
    try {
        const data = await latestExchange()
        const base = data.base;
        const rates = data.rates;
        for (const [target_currency, rate] of Object.entries(rates)) {
            const key = `rate:${base}:${target_currency}`;
            
            //Save to redis with 23- hours TTL
            await redisClient.set(key, rate, {EX: 82800}) 

            //Save to postgres database as a backup too
            await saveExchangeRate(base, target_currency, rate);
          }
        console.log("Rate has been fetched successfully");

        return;
    }
    catch(error) {
        console.error("Error fetching rates", error);
        next(error)
    }
}