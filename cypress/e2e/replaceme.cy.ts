describe('Site should be password locked', () => {
  it('should render the Index page or handle password redirection', () => {
    cy.visit(`${Cypress.env('BASE_URL')}inner?bypass=true`)
    cy.url().then(url => {
      if (url.includes('/admin/password')) {
        cy.get('input[name="password"]').type(Cypress.env('POC_PASSWORD'))
        cy.get('button[type="submit"]').click()

        cy.url().then(redirectedUrl => {
          const normalizedUrl = redirectedUrl.replace(/^https?:\/\//, '')
          const expectedUrl = Cypress.env('BASE_URL').replace(/^https?:\/\//, '')
          expect(normalizedUrl).to.eq(expectedUrl)
        })
      } else {
        expect(false)
      }
    })
  })
})

describe('Inner Routes', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', err => {
      // eslint-disable-next-line no-console
      console.error('An uncaught exception occurred:', err.message)
      return false
    })
    cy.session('login', () => {
      cy.visit(`${Cypress.env('BASE_URL')}inner`)
      cy.url().then(url => {
        if (url.includes('/admin/password')) {
          cy.get('input[name="password"]').type(Cypress.env('POC_PASSWORD'))
          cy.get('button[type="submit"]').click()
          cy.url().should('not.include', '/admin/password')
        }
      })
    })
  })

  it('should redirect to one login mock pages without manual bypass', () => {
    cy.visit(`${Cypress.env('BASE_URL')}inner`)
    cy.url().should('include', '/one-login')
    cy.get('h1').contains('Create a GOV.UK One Login or sign in')
  })

  it('should access the Inner Index page', () => {
    cy.visit(`${Cypress.env('BASE_URL')}inner?bypass=true`)
    cy.get('h1').contains('Welcome, Joe')
  })
})
