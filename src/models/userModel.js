import pool from "../config/db.js";

export const checkUserAvailabilityService = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1`;  
        const values = [email];
        const data = await pool.query(query, values);

        if (!data.rows || data.rows.length === 0) {
            return null;
        }  
        
        return data.rows[0];  
    } catch (error) {
        console.error("Error in checkUserAvailabilityService:", error);
        throw error;
    }
}

export const insertNewUserService = async(email, password_hash) => {
    try {
        const query = `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`;
        const values = [email, password_hash];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch(error) {
        console.error("Error in insertNewUserService:", error);
        throw error;
    }
}

export const checkEmailService = async(email) => {

    const query = `SELECT * FROM users WHERE email = $1`;
    try {
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0 ) {
        return null
    }
    return result.rows[0]
} catch (error) {
    console.error('Error in the check email service', error)
    throw error;
}
}