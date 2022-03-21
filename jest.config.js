module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js'
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    transform: {
        '^.+\.jsx?$': 'babel-jest',
    },
  };