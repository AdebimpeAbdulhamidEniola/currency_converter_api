import  exchangeRate  from "../services/openExchangeRateServices.js";
import { saveExchangeRate } from "../models/exchangeRateModel.js";


export const getExchangeRates = async (req, res, next) => {
    try {
        const data = await exchangeRate()
        const base = data.base;
        const rates = data.rates;
        for (const [target_currency, rate] of Object.entries(rates)) {
            await saveExchangeRate(base, target_currency, rate);
          }
        console.log("Rate has been fetched successfully");

        return;
    }
    catch(error) {
        console.error("Error fetching rates", error);
    }
}