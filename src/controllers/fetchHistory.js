import { historyData } from "../services/openExchangeRateServices.js";
import { responseHandler } from "./responseHandler.js";


export const fetchHistory = async (req, res, next) => {
    const baseCurrency = req.query.baseCurrency;
    const targetCurrency = req.query.targetCurrency;
    const date = req.query.date;

    if (!date) {        //If its is a server error, you log.If the error is from the user .You ccan probably show only the user
        return res.status(400).json({
            error: "Date is not provided.Please provide a specific date"
        })
    }

    const getHistory = await historyData(date);

    if(!baseCurrency || !targetCurrency) {
        return res.status(400).json({
            error: "Missing baseCurrency or targetCurrency.Please provide"
        })
    }

    const baseRate = getHistory.rates[baseCurrency];
    const targetRate = getHistory.rates[targetCurrency];

    //Perform calculation to get the rate as at the requeted date

    const relativeRate = Number(targetRate/baseRate).toFixed(6);
    const data = `The rate of 1${baseCurrency} to ${targetCurrency} is ${relativeRate}`;
    responseHandler(res,200,'History has successfully been fetched',data )
}