const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

class ExpressApp {
  constructor() {
    this.app = express();
    this.setMiddleware();
  }

  getApp() {
    return this.app;
  }

  setMiddleware() {
    // Use the logger middleware before other middleware
    this.app.use(this.logRequests.bind(this));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());

    this.app.get("/", (req, res) => {
      res.send("Welcome to the homepage!");
    });

    this.app.use("/api", routes);

    this.app.use((req, res, next) => {
      next(createError(404));
    });

    this.app.use((err, req, res, next) => {
      logger.error(err.message);
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "test" ? err : {};
      if (err.status === 404) {
        return res.status(404).json({
          error: "Not Found",
          message: "The requested resource does not exist.",
        });
      }
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message,
        },
      });
    });
  }

  logRequests(req, res, next) {
    logger.info(`${req.method} ${req.url}`);
    next();
  }
}
const expressAppInstance = new ExpressApp();
module.exports = expressAppInstance.getApp();
