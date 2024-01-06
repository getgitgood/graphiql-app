module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.ts*',
    '!src/test/**',
    '!src/**/*.d.ts',
    '!src/**/store.ts',
    '!src/utils/**'
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};
