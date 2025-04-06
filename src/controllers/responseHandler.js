//Function to send standardized response to be used in the controller
export const responseHandler = (res, status, message, data = null) => {
    res.status(status).json({
        status: status,
        message: message,
        data: data
    })
}
