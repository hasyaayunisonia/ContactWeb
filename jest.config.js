module.exports = {
  setupFilesAfterEnv: ["/src/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
