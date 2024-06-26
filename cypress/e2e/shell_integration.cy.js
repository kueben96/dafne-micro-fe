describe('Routing Test', () => {
  const container_base_url = 'http://localhost:8080';
  const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

  const login = () => {
    // cy.get('input[name="email"]').type("jenny.smith@test.com");
    // cy.get('input[name="password"]').type("user_pass");
    cy.get('button[type="submit"]').should('be.visible').click();
  };

  it('Visits the Marketing Microfrontend on index', () => {
    cy.visit('localhost:8080');
    cy.url().should('eq', `${container_base_url}/marketing/`);
  });
  it('Visits the Marketing Microfrontend on /marketing', () => {
    cy.visit(`${container_base_url}/marketing`);
    cy.contains('Marketing App');
  });
  it('Navigates to auth from marketing, logs in and navigates to dafne', () => {
    cy.visit(`${container_base_url}/marketing`);
    cy.contains('auth').click();
    cy.url().should('eq', `${container_base_url}/auth/login`);

    login()

    cy.window().then((window) => {
      const token = window.localStorage.getItem("jwtToken");
      expect(token).to.exist;
    });

    cy.url().should('eq', `${container_base_url}/dafne/dashboard/jobs`);
  });

  it('Checks if protected /dafne route can be accessed when visiting it in unauthenticated mode', () => {
    cy.visit(`${container_base_url}/dafne`);
    cy.window().then((window) => {
      const token = window.localStorage.getItem("jwtToken");
      expect(token).to.be.null;
    });
    cy.url().should('eq', `${container_base_url}/auth/login`);
  });
  it('Checks correct redirect to protected route after successfull login', () => {
    cy.visit(`${container_base_url}/dafne/methods/reproduction`);
    cy.window().then((window) => {
      const token = window.localStorage.getItem("jwtToken");
      expect(token).to.be.null;
    });
    cy.url().should('eq', `${container_base_url}/auth/login`);
    login()
    cy.url().should('eq', `${container_base_url}/dafne/methods/reproduction`);
  });
});