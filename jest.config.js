module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
    '@/src/(.*)': '<rootDir>/src/$1',
    '@/pages/(.*)': '<rootDir>/src/pages/$1',
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/styles/(.*)': '<rootDir>/src/styles/$1',
    '@/contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/services/(.*)': '<rootDir>/src/services/$1',
    '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
  },
};
