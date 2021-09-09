const express = require("express");
const compression = require("compression");
const cors = require("cors");
const subscriptionHandler = require('./subscriptionHandler')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/subscription", subscriptionHandler.handlePushNotificationSubscription);
app.get("/subscription/:id", subscriptionHandler.sendPushNotification);

module.exports = app;
