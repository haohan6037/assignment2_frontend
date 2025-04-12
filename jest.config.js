module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        "/node_modules/(?!axios|react-router-dom)/"  // 使 axios 和 react-router-dom 等依赖通过 Babel 转换
    ],
    moduleNameMapper: {
        "^react-router-dom$": "<rootDir>/node_modules/react-router-dom"
    }
};