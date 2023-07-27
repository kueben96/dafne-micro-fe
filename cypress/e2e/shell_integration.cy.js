describe('Routing Test', () => {
  const container_base_url = 'http://localhost:8080';
  const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

  const login = () => {
    cy.get('input[name="email"]').type("email");
    cy.get('input[name="password"]').type("password");
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
  it('Clicks on the Auth button and checks if login route is opened', () => {
    cy.visit(`${container_base_url}/marketing`);
    cy.contains('auth').click();
    cy.url().should('eq', `${container_base_url}/auth/login`);

    login()

    cy.window().then((window) => {
      const token = window.localStorage.getItem("jwtToken");
      expect(token).to.exist;
    });

    cy.url().should('eq', `${container_base_url}/dafne/dashboard/processes`);
  });

  it('Checks if /dafne route can be accessed when visiting it in unauthenticated mode', () => {
    cy.visit(`${container_base_url}/dafne`);
    cy.window().then((window) => {
      const token = window.localStorage.getItem("jwtToken");
      expect(token).to.be.null; // or .not.to.exist
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