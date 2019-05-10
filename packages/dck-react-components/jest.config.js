module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testRegex: ".*\\.spec\\.(ts|tsx|js)$",
  testResultsProcessor: "./node_modules/jest-junit-reporter",
  testEnvironment: "node"
};
