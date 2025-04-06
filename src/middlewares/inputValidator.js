import Joi from "joi"

//Validating Sign Up and  Login
const userDefn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(5).required()
})  

export const validateUser  = (req, res, next) => {
const {error} = userDefn.validate(req.body)
if (error) {
    // console.log(error.details[0].message)
    return res.status(400).json({
        status:400,
        message: error.details[0].message
    })
}
next();
}