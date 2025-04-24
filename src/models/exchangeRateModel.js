import pool from '../config/db.js';

export const saveExchangeRate = async (base, target, rate) => {
   try {
    const query = `INSERT INTO exchange_rates (base_currency, target_currency, rate, date)
     VALUES ($1, $2, $3, NOW()::DATE ) RETURNING *`
     const rates = await pool.query(query, [base, target, rate]);  
    return rates.rows[0];
   }
    catch (error) {
     console.error('Error saving exchange rate:', error);
     throw error;
    }
  };