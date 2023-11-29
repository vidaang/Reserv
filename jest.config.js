module.exports = {
    testEnvironment: 'node',
    // transformIgnorePatterns: ["node_modules/(?!(dependency-to-transform)/)"]
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/frontend/"]
    // ... other configurations
};
