import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: 'node',
  moduleNameMapper: {
    "test/(.*)": "<rootDir>/test/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
  ]
};
export default config;
