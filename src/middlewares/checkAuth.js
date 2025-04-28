import {default as jwt} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export default (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Auth failed: No token provided" });
        }

        const token = authHeader.split(" ")[1]; 
        const decoded = jwt.verify(token,process.env.SECRET_KEY );  //This returns the decoded token if the token is valid
        req.userInfo = decoded;
        next();    
    }
    catch(error) {
        next(error);
    }
}
