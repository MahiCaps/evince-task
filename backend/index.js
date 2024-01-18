require("dotenv").config("./../env");

import http from "http";

const app = require("./app/app");
const debug = require("debug")("myapp:server");

const port = normalizePort(process.env.PORT || 5001);
let host = process.env.HOST || "";
if (!port) {
  console.error("Api port is not found please try again.");
  process.exit(1);
}
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();

  if (typeof addr === "string") {
    host = addr;
  } else if (addr.address === "::") {
    host = "[::1]"; // Use IPv6 loopback address for readability
  } else {
    host = addr.address || "localhost";
  }
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  const url = `http://${host}:${addr.port}`;
  console.log(`Server running on ${process.env.NODE_ENV} at ${url}`);
  debug(`Listening on ${bind}`);
}
