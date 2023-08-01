describe('Add Liquidity', () => {
  it('loads the two correct tokens', () => {
    cy.visit('/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NSWAP')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'NUSD')
  })

  it('loads the NRK and tokens', () => {
    cy.visit('/add/NRK/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NRK')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'NSWAP')
  })

  it('loads the WNRK and tokens', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'WNRK')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'NSWAP')
  })

  it('does not crash if NRK is duplicated', () => {
    cy.visit('/add/NRK/NRK')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NRK')
    cy.get('#add-liquidity-input-tokenb #pair').should('not.contain.text', 'NRK')
  })

  it('does not crash if address is duplicated', () => {
    cy.visit('/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NSWAP')
    cy.get('#add-liquidity-input-tokenb #pair').should('not.contain.text', 'NSWAP')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'QUACK')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'NSWAP')
  })

  it('single token can be selected', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'QUACK')
    cy.visit('/add/0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NUSD')
    cy.visit('/add/NRK')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'NRK')
  })

  it('redirects /add/token-token to add/token/token', () => {
    cy.visit('/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E-0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288')
    cy.url().should(
      'contain',
      '/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xb30ebc0Ec978472B4a500a717880fE4D8f8c3288',
    )
  })

  it('redirects /add/NRK-token to /add/NRK/token', () => {
    cy.visit('/add/NRK-0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.url().should('contain', '/add/NRK/0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
  })

  it('redirects /add/token-NRK to /add/token/NRK', () => {
    cy.visit('/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E-NRK')
    cy.url().should('contain', '/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/NRK')
  })

  it('redirects /add/WNRK to /add/WNRK/token', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c-0xb2056F916E2485bE08e25246974a1c88d8F57F9E')
    cy.url().should(
      'contain',
      '/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0xb2056F916E2485bE08e25246974a1c88d8F57F9E',
    )
  })

  it('redirects /add/token-WNRK to /add/token/WNRK', () => {
    cy.visit('/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E-0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
    cy.url().should(
      'contain',
      '/add/0xb2056F916E2485bE08e25246974a1c88d8F57F9E/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    )
  })
})
