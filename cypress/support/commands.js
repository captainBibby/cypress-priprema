// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginViaBackend", () =>{
  cy.request({
    method: "POST",
    url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login ",
    body: {
      email: Cypress.env("userEmail"),
      password: Cypress.env("userPassword"),
    },
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    expect(resp.body).to.have.property("token");
    expect(resp.body).to.have.property("user");
    window.localStorage.setItem("token", resp.body.token);
    window.localStorage.setItem("user", JSON.stringify(resp.body.user));
    window.localStorage.setItem("user_id", resp.body.user.id);
  });

  cy.visit("my-organizations");
})