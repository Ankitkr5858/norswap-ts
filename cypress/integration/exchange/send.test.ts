describe('Send', () => {
  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit(
      '/send?inputCurrency=0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288&outputCurrency=0xb2056F916E2485bE08e25246974a1c88d8F57F9E',
    )
    cy.url().should(
      'contain',
      '/swap?inputCurrency=0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288&outputCurrency=0xb2056F916E2485bE08e25246974a1c88d8F57F9E',
    )
  })
})
