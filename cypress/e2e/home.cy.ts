describe('Load Home Page', () => {
    it('It load the container', () => {
        cy.visit('/')
        cy.get('#container').should('be.visible')
    })
})
