import pool from "../config/db.js"

const createRatesTable = async() => {
    const query = `CREATE TABLE IF NOT EXISTS exchange_rates (
        id SERIAL PRIMARY KEY,
        base_currency VARCHAR(3) NOT NULL,
        target_currency VARCHAR(3) NOT NULL,
        rate NUMERIC NOT NULL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_base_target UNIQUE (base_currency, target_currency) )`;  
try {
    const newTable = await pool.query(query);
    console.log("Table rates has successfully been created if not exist");
}
catch(error) {
    console.log("Error creating rates table", error);
}

}

export default createRatesTable;