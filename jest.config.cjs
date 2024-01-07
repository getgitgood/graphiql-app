module.exports = {
  setupFiles: ['./jest.polyfills.cjs'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.ts*',
    '!src/test/**',
    '!src/**/*.d.ts',
    '!src/**/store.ts',
    '!src/utils/**',
    '!src/App.tsx',
    '!src/main.tsx',
    '!src/types/**',
    '!src/components/Context/Context.tsx',
    '!src/components/EditorContext/EditorContext.tsx'
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/test/jest.setup.ts',
    '<rootDir>/src/test/server/server.ts'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(thememirror|@firebase|firebase)/)'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};
