import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/app/$1',
    },
    testMatch: [
        '**/test/**/*.test.ts',
    ],
}

export default config