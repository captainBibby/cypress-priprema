/// <reference types="Cypress"/>

import {loginPage} from './page_objects/loginPage'

describe('login test', () => {
    
    before("login test", () => {
        cy.visit("/");
        cy.url().should("include", "login");

        loginPage.loginHeading.should("be.visible")
        .and("have.text" , "Log in with your existing account")
    });

    it ("login with valid credentials", () => {
        cy.intercept(
            "POST",
            "https://cypress.vivifyscrum-stage.com/login"
          ).as("successfullLogin");

        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
            
        cy.wait("@successfullLogin").then((interception) => {
            cy.log(JSON.stringify(interception.response));
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.access_token).to.exist;
        });
        cy.url().should("not.include", "login");
    })
})