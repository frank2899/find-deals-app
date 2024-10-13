/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
    // returning false here prevents Cypress from failing the test
    // Needed for trading competition page since it throws unhandled rejection error
    return false
})
