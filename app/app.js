const express = require('express');
const morgon = require('morgan');
const adminRouter = require('../routes/Staff/AdminRouter');

const app = express();

//Middlewares
app.use(morgon('dev'));
app.use(express.json());

//Routes
app.use("/api/v1/admins", adminRouter);

module.exports = app;