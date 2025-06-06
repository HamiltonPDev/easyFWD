/// <reference types="cypress" />
describe('NextAuth Credentials Login', () => {
  /* Test:1 Valid credentials */
  it('logs in with valid credentials', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('admin@easyfwd.com');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

    // Assert: redirected to dashboard or see user info
    cy.url().should('not.include', '/login');
    cy.contains('Admin'); // Or any element that shows the user is logged in
  });

  /* Test:2 Invalid credentials */
  it('logs in with invalid credentials', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('admin@easyfwd.com');
    cy.get('input[name="password"]').type('invalid');
    cy.get('button[type="submit"]').click();
  });

  /* Test:3 Invalid email format */
  it('logs in with invalid email format', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('invalid');
    cy.get('input[name="password"]').type('admin1234');
  });

  /* Test:4 Invalid password format */
  it('logs in with invalid password format', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="email"]').type('admin@easyfwd.com');
    cy.get('input[name="password"]').type('invalid');
  });

  /* Test:5 Middleware redirect to login */
  it('middleware redirects to login', () => {
    cy.visit('/admin');
    cy.url().should('include', '/login');
  });  
});