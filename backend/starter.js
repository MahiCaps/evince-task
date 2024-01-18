/* eslint-disable import/no-extraneous-dependencies */
require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-object-rest-spread",
  ],
});

// Import the rest of our application.
module.exports = require("./index.js");
