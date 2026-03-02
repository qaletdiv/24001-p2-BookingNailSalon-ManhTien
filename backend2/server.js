const express = require("express");
const app = express();
const port = 4444;
const requestLoggerMiddleware = require("./middlewares/requestLoggerMiddleware");
app.use(requestLoggerMiddleware);
