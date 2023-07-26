describe('Basic Test', () => {
  it('Visits the Marketing Microfrontend on index', () => {
    cy.visit('localhost:8080'); // Replace '/marketing' with the correct route of your marketing microfrontend.
    cy.contains('Marketing App');
  });
  it('Visits the Marketing Microfrontend on /marketing', () => {
    cy.visit('localhost:8080/marketing'); // Replace '/marketing' with the correct route of your marketing microfrontend.
    cy.contains('Marketing App');
  });
  it('Clicks on the Auth button and checks if the login button is visible', () => {
    // Visit the /marketing path
    cy.visit('localhost:8080/marketing');

    // Find the button with text "Auth" and click on it
    cy.contains('auth').click();

    // Check if the login button is visible on the page
    cy.get('button[type="submit"]').should('be.visible');
  });
});