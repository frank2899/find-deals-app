import { defineConfig } from 'cypress'

export default defineConfig({
    numTestsKeptInMemory: 0,
    retries: {
        runMode: 2, // Configure retry attempts for `cypress run`
        openMode: 0, // Configure retry attempts for `cypress open`
    },
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    fixturesFolder: false,
    video: false,
    viewportHeight: 720,
    viewportWidth: 1280,
    e2e: {
        baseUrl: 'http://localhost:3000',
        slowTestThreshold: 8000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {},
})
