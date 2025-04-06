import { checkEmailService, checkUserAvailabilityService, insertNewUserService } from "../models/userModel.js";
import { responseHandler } from "./responseHandler.js";
import bcrypt from "bcrypt";
import {default as jwt} from "jsonwebtoken";  

//Signing Up
export const register = async(req, res, next) => {
    const {email, password} = req.body;
    
    // Check if the user has previously registered
    try {
        const previousUser = await checkUserAvailabilityService(email);

        if (previousUser) {
            return res.status(400).json({
                message: "Error! email already exists"
            });
        }
        
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = await insertNewUserService(email, password_hash);
        const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.setHeader("Authorization", `Bearer ${token}`);

        return responseHandler(res, 201, 'User has been registered successfully');
    } catch(error) {
        next(error);
    }
}


//Logging In
export const login = async(req, res, next) => {
    const {email, password} = req.body;
    
    //Check if the email is in the database
    const data = await checkEmailService(email);
    
    if (!data) {
        return res.status(401).json('Auth failed')
    }
    try{
        //If we have verified that the username is in the database we can now compare the password
        const comparePasword = await bcrypt.compare(password, data.password_hash);   
        //The above line of code compares what the user types in with the database password hash
        //and returns a Boolean value
        if (comparePasword) {
            const token = jwt.sign({email},process.env.SECRET_KEY,  {expiresIn: "3h"});
            res.setHeader("Authorization", `Bearer ${token}`);
            return responseHandler(res, 200, 'Authentication Succesful');
        }
        return res.status(401).json({
            message: "Auth failed"
        })
    }
    catch(error){
        next(error)
    }

}