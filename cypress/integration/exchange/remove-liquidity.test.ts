describe('Remove Liquidity', () => {
  it('redirects from address-address to address/address', () => {
    cy.visit('/remove/0xb2056F916E2485bE08e25246974a1c88d8F57F9E-0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288')
    cy.url().should(
      'contain',
      '/remove/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288',
    )
  })

  it('nrk-nswap remove', () => {
    cy.visit('/remove/NRK/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'NRK')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NSWAP')
  })

  it('nswap-nrk remove', () => {
    cy.visit('/remove/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/NRK')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'NSWAP')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NRK')
  })

  it('loads the two correct tokens', () => {
    cy.visit('/remove/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'NSWAP')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NUSD')
  })

  it('does not crash if NRK is duplicated', () => {
    cy.visit('/remove/NRK/NRK')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'NRK')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NRK')
  })

  it('does not crash if token is duplicated', () => {
    cy.visit('/remove/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'NSWAP')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NSWAP')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/remove/0xD74b782E05AA25c50e7330Af541d46E18f36661C/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'QUACK')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'NSWAP')
  })
})
