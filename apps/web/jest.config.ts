import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: ["/node_modules/(?!@quinto-set/contracts)"],
  collectCoverageFrom: [
    "src/lib/**/*.{ts,tsx}",
    "src/components/ui/ContactForm.tsx",
    "src/components/ui/Field.tsx",
    "src/components/ui/FormSuccess.tsx",
  ],
  coverageThreshold: {
    global: {
      lines: 60,
      statements: 60,
      functions: 60,
      branches: 60,
    },
  },
};

export default createJestConfig(config);
