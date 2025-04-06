import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { resourceUnavailable, generalErrorHandler } from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";



dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());


//Routes
//Testing database connection
// app.get('/', async(req, res, next) => {
//     try {
//         const result = await pool.query("SELECT NOW()");
//         console.log(result)
//         res.send(result)
//     }
//     catch(err) {
//         console.error(err)
//     }
// })

//Create table before starting server and before going to an routes
createUserTable();


app.use('/users', userRoutes)





// Error handling middleware
app.use(resourceUnavailable);      //when user request didn't match any of the above endpoint
app.use(generalErrorHandler) ;     //generalized error handling
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});