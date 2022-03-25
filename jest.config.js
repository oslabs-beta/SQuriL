module.exports = {
    clearMocks: true,
    verbose: true,
    moduleNameMapper: {
        '\.(css|less|sass|scss)$': '<rootDir>/config/CSSStub.js',
        '\.(gif)$': '<rootDir>/config/CSSStub.js',
        '.+\.(png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy'
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "png"],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    transform: {
        '^.+\.jsx?$': 'babel-jest',
    },
    modulePaths: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
};