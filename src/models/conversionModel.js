import redisClient from "../config/redisClient.js";
import pool from "../config/db.js"

export const fetchRates = async(currency) => {
    //Check Redis database first
    const key = `rate:USD:${currency}`;
    const cachedRate = await redisClient.get(key);
    if (cachedRate){
        console.log(`Cache hit for ${key}`);
        return parseFloat(cachedRate);

    }
    console.log(`Cache miss for ${key}`);

    const query = `SELECT * from exchange_rates WHERE target_currency = $1`;
    const data = await pool.query(query, [currency]);
    if (!data || data.rows.length != 0) {
        return data.rows[0].rate;
    }
    else {
        return null;
    }
}

