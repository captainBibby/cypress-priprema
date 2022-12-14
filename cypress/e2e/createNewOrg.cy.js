/// <reference types="Cypress"/>

import {myOrganizationsPage} from './page_objects/myOrganizationsPage'
import { faker } from '@faker-js/faker';

let orgName = faker.lorem.words(2)

describe('login test', () => {
    
    before("login test", () => {
        cy.loginViaBackend();
        cy.visit("/my-organizations");
    })

    it ("visit default URL", () => {
        cy.url().should("not.include", "login");
    });

    it ("create a new organization", () => {
        
        cy.intercept(
            "POST",
            " https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations"
        ).as("successfullyCreatedOrganization");

        myOrganizationsPage.createOrg(
            orgName
        );

        cy.wait("@successfullyCreatedOrganization").then ((interception) => {
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body).to.exist;
        })
    });
});