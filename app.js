const express = require('express');
const cors = require('cors')
require('express-async-errors');
require('dotenv').config();

const CustomerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');

const notFoundRouteMiddleware = require('./middleware/notFoundRouteMiddleware');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

const app = express();
const Port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/customers', CustomerRoute);
app.use('/api/orders', OrderRoute);
app.use('/api/products', ProductRoute);

app.use(notFoundRouteMiddleware);
app.use(errorHandlerMiddleware);

app.listen(Port, console.log(`App is listening on ${port}...`));