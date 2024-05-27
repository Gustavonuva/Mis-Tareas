module.exports = {
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],

  testPathIgnorePatterns: ["/node_modules/"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  testEnvironment: "jest-environment-jsdom",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
