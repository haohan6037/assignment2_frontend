module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        "/node_modules/(?!axios)/"
    ],
    moduleNameMapper: {
        // "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
    }
};