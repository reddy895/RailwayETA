module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transformIgnorePatterns: ['node_modules/(?!(railkit)/)'],
  moduleNameMapper: {
    '^railkit$': '<rootDir>/src/__mocks__/railkit.ts',
  },
  verbose: true,
  forceExit: true,
};
