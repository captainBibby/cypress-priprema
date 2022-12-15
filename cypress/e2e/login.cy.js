/// <reference types="Cypress"/>

import { loginPage } from './page_objects/loginPage'

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
            "https://cypress-api.vivifyscrum-stage.com/api/v2/login")
            .as("successfullLogin");

        cy.intercept(
            "GET",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations")
        .as("getMyOrganizations");


        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
            
        cy.wait("@successfullLogin").then((interception) => {
            cy.log(JSON.stringify(interception.response));
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.token).to.exist;
        });

        cy.wait("@getMyOrganizations").then((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body[0].id).eq(23696);
            expect(interception.response.body[1].name).eq("dfdfd");
            expect(interception.response.body).length(2);
            expect(interception.response.body[0].owner_id).eq(interception.response.body[1].owner_id);
        });

        cy.url().should("not.include", "login");
    });
});
