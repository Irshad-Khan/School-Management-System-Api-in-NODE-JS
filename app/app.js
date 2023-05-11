const express = require('express');
const morgon = require('morgan');
const adminRouter = require('../routes/Staff/AdminRouter');
const { globalErrorHandler, notFoundError } = require('../middlewares/globalErrorHandler');

const app = express();

//Middlewares
app.use(morgon('dev'));
app.use(express.json());

//Routes
app.use("/api/v1/admins", adminRouter);

//Custom Error Handler
app.use(notFoundError);
app.use(globalErrorHandler);


module.exports = app;