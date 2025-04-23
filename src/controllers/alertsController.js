import { saveAlert } from "../models/alertModel.js";
import { responseHandler } from "./responseHandler.js";


export const saveAlertDetails = async(req, res, next) => {
    const email = req.userInfo.email;

    const baseCurrency = req.body.baseCurrency;

    const targetCurrency = req.body.targetCurrency

    const thresholdRate = req.body.thresholdRate;

    try {
        const alertDetails = await saveAlert(email, baseCurrency, targetCurrency, thresholdRate);
        console.log("The alerts has been saved", alertDetails);
        responseHandler(res, 200, "The alerts has been saved", alertDetails);
    }

    catch(error) {
     error.message = "Failed  to save alerts to the database";
     next(error)
    }

}


