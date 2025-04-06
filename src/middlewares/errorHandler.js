
export const resourceUnavailable = (req, res, next) => {
    const error = new Error('Resource unavailable');
    error.status = 404   //Client side error
    next(error)
}



export const generalErrorHandler = (error,req, res, next) => {
    console.log(`Error has message "${error.message}"`);
    res.status(error.status || 500);
    res.json({
        error: error.message,
        status_code: error.status || 500
    })
}