const globalErrorHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'Faild';
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({ status, message, stack })

}

const notFoundError = (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    next(error); // This is pass a message to next middleware.
}

module.exports = { globalErrorHandler, notFoundError };