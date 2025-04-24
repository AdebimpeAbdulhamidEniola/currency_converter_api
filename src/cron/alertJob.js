import pool from "../config/db.js";
import { sendEmail } from "../services/sendEmailServices.js";
import cron from "node-cron";

const notifier = async () => {

const query = `SELECT * FROM rate_alerts WHERE is_sent = FALSE`;

const results = await pool.query(query);

for (const unsentAlert of results.rows) {
    const email = unsentAlert.email;
    const leastRate = unsentAlert.least_rate;
    const baseCurrency = unsentAlert.base_currency;
    const targetCurrency = unsentAlert.target_currency;

    //Fetch current rate from the database for both the base currency and the target currency 
    //with respect to dollar    
    const baseRateQuery = `SELECT rate FROM exchange_rates WHERE target_currency = $1`;
    const targetRateQuery = `SELECT rate FROM exchange_rates WHERE target_currency = $1`;

    const baseRateResult = await pool.query(baseRateQuery, [baseCurrency]);
    const targetRateResult = await pool.query(targetRateQuery, [targetCurrency]);

    //Checking if both base rate and target rate are defined here
    const baseRate = baseRateResult.rows[0]?baseRateResult.rows[0].rate : undefined;
    const targetRate = targetRateResult.rows[0]? targetRateResult.rows[0].rate : undefined; 

    if (!baseRate || !targetRate) {
        console.error(`Missing rates for ${baseCurrency} or ${targetCurrency}`);  //alertss like thhs can never be marked true in the database because of the 
        continue;                                                                 //non -existent data thta is being provided in the database  
    }

    //Calculate the current live rate 
    const liveRate = Number(targetRate / baseRate).toFixed(6);

    //Make comparism, if true then send your email.   
    if (liveRate >= leastRate) {
    
        await sendEmail(email, `Your currency alert hit!`, `The exchange rate for ${baseCurrency} to ${targetCurrency} has reached your target rate of ${leastRate}. Current rate: ${liveRate}`);

        const updateQuery = `UPDATE rate_alerts SET is_sent = TRUE WHERE id = $1`;
        await pool.query(updateQuery, [unsentAlert.id]);
    }
}

}

cron.schedule("52 21 * * *", async () => {    
    try {
        await notifier();
        console.log("Notifier system schedule has run");
    } catch (error) {
        console.error("Error while running the notifier ", error);
    }
});