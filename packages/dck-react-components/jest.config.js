module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testRegex: ".*\\.spec\\.(ts|tsx|js)$",
  testResultsProcessor: "./node_modules/jest-junit-reporter"
};
