import pool from "../config/db.js";

export const fetchActiveAlerts = async() => {
  try {
    const query = `SELECT * FROM rate_alerts WHERE is_sent = FALSE`
    const result = await pool.query(query);
    return result.rows   
    }
    catch(error) {
        console.log("Error fetchig rates alert from database");
        throw error
    }
}


export const saveAlert = async(email,baseCurrency, targetCurrency, thresholdRate,) => {
  try {
    const query = `INSERT INTO  rate_alerts (email, base_currency, target_currency, least_rate) VALUES($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(query, [email, baseCurrency, targetCurrency,thresholdRate]);
    return result.rows[0]
  }
  catch(error) {
    throw error   //i.e throw error to the controller;
  }

}


