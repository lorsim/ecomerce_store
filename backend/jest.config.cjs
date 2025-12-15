module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.cjs"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
