import redisClient from "../config/redisClient.js";
import { fetchRates } from "../models/conversionModel.js";
import { responseHandler } from "./responseHandler.js";

export const saveFavourites = async(req, res, next) => {
    const favouriteBaseCurrency = req.body.favouriteBaseCurrency;
    const favouriteTargetCurrency = req.body.favouriteTargetCurrency;
    
    const userId = req.userInfo.email;
    
    const key = `favourite_currency_pair:${userId}`;

    const value = JSON.stringify({
        base: favouriteBaseCurrency,
        target: favouriteTargetCurrency
    });
    const result = await redisClient.sAdd(key, value);

    if (Number.isInteger(result)) {
        console.log(result);
        const currentBaseCurrencyRate= await fetchRates(favouriteBaseCurrency);
        const currentTargetCurrencyRate =await fetchRates(favouriteTargetCurrency);
        const relativeRate =  Number(currentTargetCurrencyRate/currentBaseCurrencyRate).toFixed(6);
        responseHandler(res, 200, 'Your favourite currency pair has been saved', `The current rate is ${relativeRate} per ${favouriteTargetCurrency}`);
    
    }
}


export const getFavourites = async (req, res,next) => {    
    const userId = req.userInfo.email;

    const key = `favourite_currency_pair:${userId}`;
    const result = await redisClient.sMembers(key);
    
    const favouritePairs = result.map(elem => JSON.parse(elem) );
    responseHandler(res, 200, 'Here are your favourite pairs', favouritePairs);

}

