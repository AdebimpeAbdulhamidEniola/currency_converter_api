
import { fetchRates } from "../models/conversionModel.js";
import { responseHandler } from "./responseHandler.js";

export const convert = async(req, res, next) =>  {
    //Get the details of the conversion from the user
    const convertFrom = req.body.convertFrom;
    const convertTo= req.body.convertTo;
    const amount = req.body.amount

    //Converting....
    //Now we have to fetch from the database 
    const rateNumerator = await fetchRates(convertTo)
    const rateDenominator = await fetchRates(convertFrom);
    //Now we apply the appropriate formula
    const rate_factor  = rateNumerator / rateDenominator
    const converted_amount =  amount * rate_factor;
    const value = parseFloat(converted_amount.toFixed(3));
    responseHandler(res, 200,'Your money has been converted succesfully', `${amount}${convertFrom} is ${value}${convertTo}`);

}




export const reverse = async(req, res, next) =>  {
    //Get the details of the conversion from the user
    let convertFrom = req.body.convertFrom;
    let convertTo= req.body.convertTo;
    const amount = req.body.amount
    const temp = convertFrom;
    convertFrom  = convertTo;
    convertTo = temp



    //Converting....
    //Now we have to fetch from the database 
    const rateNumerator = await fetchRates(convertTo)
    console.log(convertTo)
    console.log(convertFrom)
    const rateDenominator = await fetchRates(convertFrom);
    //Now we apply the appropriate formula
    const rate_factor  = rateNumerator / rateDenominator
    const converted_amount =  amount * rate_factor;
    const value = parseFloat(converted_amount.toFixed(3));
    responseHandler(res, 200,'Your money has been converted succesfully in a reverse manner', `${amount}${convertFrom} is ${value}${convertTo}`);

}
