/// <reference types="Cypress"/>

import { myOrganizationsPage } from './page_objects/myOrganizationsPage'
import { faker } from '@faker-js/faker';

let orgName = faker.lorem.words(2)

describe('login test', () => {
    
    before("login test", () => {
        cy.loginViaBackend();
        cy.visit("/my-organizations");
        cy.url().should("not.include", "login");
    })

    it ("create a new organization", () => {
        
        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations")
            .as("successfullyCreatedOrganization");

        myOrganizationsPage.createOrg(orgName);

        cy.wait("@successfullyCreatedOrganization").then ((interception) => {
            cy.log(JSON.stringify(interception.response.body));
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body.name).eq(orgName);
        })

        cy.url().should("include", "boards");
        cy.visit("/my-organizations");
        myOrganizationsPage.organizationTitle.contains(orgName).should("have.text", orgName);

    });
});
