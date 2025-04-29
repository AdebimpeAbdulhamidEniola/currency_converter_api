// services/fetchAndStoreRates.js

import { saveExchangeRate } from "../models/exchangeRateModel.js";
import redisClient from "../config/redisClient.js";
import { latestExchange } from "./openExchangeRateServices.js";

export const fetchAndStoreRates = async () => {
    const data = await latestExchange();
    const base = data.base;
    const rates = data.rates;

    for (const [target_currency, rate] of Object.entries(rates)) {
        const key = `rate:${base}:${target_currency}`;
        await redisClient.set(key, rate, { EX: 82800 });
        await saveExchangeRate(base, target_currency, rate);
    }

    console.log("Rate has been fetched successfully");
};
