module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'], 
    transformIgnorePatterns: [], //aqui se pueden especificar los modulos que debe ignorar jest
}