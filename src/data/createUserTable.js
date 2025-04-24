import pool from "../config/db.js";

const createUserTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`;
    
    try {
        const newTable = await pool.query(query);
        console.log("Table user has successfully been created if not exist");
    }
    catch (error) {
        console.log("Error creating users table", error);
    }
};

export default createUserTable;