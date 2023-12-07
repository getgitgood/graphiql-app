module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts*',
    '!src/test/**',
    '!src/**/*.d.ts',
    '!src/**/store.ts',
    '!src/utils/**'
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  }
};
