const { defineConfig } = require("cypress");
const mochawesome = require("mochawesome");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adding mochawesome reporter for generating reports
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    specPattern: "cypress/integration/APItest/*.cy.js", // Corrected path with single slashes
  },
});
