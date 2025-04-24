import pool from "../config/db.js";

const createRateAlertTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS rate_alerts (
            id BIGSERIAL PRIMARY KEY,
            email VARCHAR(50) REFERENCES users(email) ON DELETE CASCADE,
            base_currency VARCHAR(3) NOT NULL,
            target_currency VARCHAR(3) NOT NULL,
            least_rate FLOAT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_sent BOOLEAN DEFAULT FALSE
        );
    `;

    try {
        const newTable = await pool.query(query);
        console.log("Table rate_alert has successfully been created if not exists");

    } catch (error) {
        console.log("Error creating rate_alert table:", error);
    }
};

export default createRateAlertTable;
