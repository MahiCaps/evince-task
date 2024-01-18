module.exports = {
  only: ["./app/", "index.js"],
  ignore: ["node_modules/**/**", ".git/**/**"],
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
    [
      "@babel/plugin-transform-class-properties",
      {
        loose: true,
      },
    ],
    "@babel/plugin-transform-object-rest-spread",
  ],
};
