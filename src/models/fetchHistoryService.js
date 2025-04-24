import pool from "../config/db.js";

export const fetchRateService = async (currencyFrom, currencyTo, startDate, endDate) => {
    // First: Fetch USD to baseCurrency rates
    const baseQuery = `
        SELECT target_currency, rate, date 
        FROM exchange_rates
        WHERE target_currency = $1 
        AND date BETWEEN $2 AND $3
        ORDER BY date ASC
    `;
    const baseResult = await pool.query(baseQuery, [currencyFrom, startDate, endDate]);

    if (!baseResult.rows || baseResult.rows.length === 0) {
        console.log("Base currency data not found");
        return;
    }

    // Second: Fetch USD to targetCurrency rates
    const targetQuery = `
        SELECT target_currency, rate, date 
        FROM exchange_rates
        WHERE target_currency = $1 
        AND date BETWEEN $2 AND $3
        ORDER BY date ASC
    `;
    const targetResult = await pool.query(targetQuery, [currencyTo, startDate, endDate]);

    if (!targetResult.rows || targetResult.rows.length === 0) {
        console.log("Target currency data not found");
        return;
    }

    // Now match base and target by date and calculate final rate
    const combinedArr = [];

    for (let i = 0; i < baseResult.rows.length; i++) {
        const base = baseResult.rows[i];

        // Find the matching target with the same date
        const target = targetResult.rows.find(t => 
            t.date.toISOString().slice(0, 10) === base.date.toISOString().slice(0, 10)
        );

        if (target) {
            const calculatedRate = target.rate / base.rate;
            const roundedRate = Number(calculatedRate.toFixed(6));

            combinedArr.push({
                date: base.date.toISOString().slice(0, 10),  // Format: "YYYY-MM-DD"
                rate: roundedRate
            });
        }
    }

    return combinedArr;
};
