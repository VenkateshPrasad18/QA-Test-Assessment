const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    env: {
      authToken: null,
    },
    baseUrl: 'https://easecommerce.in/app/login',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
