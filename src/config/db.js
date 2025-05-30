import pkg from "pg";
import dotenv from "dotenv" 

const {Pool } = pkg;
dotenv.config()


const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

pool.on("connect", () => {
console.log("Connection pool established with database")
})


export default pool

