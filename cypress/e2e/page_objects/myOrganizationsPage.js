class MyOrganizationsPage{

    get addNewOrganizatonButton(){
        return cy.get(".vs-c-my-organization--add-new");
    }

    get organizationNameInput(){
        return cy.get("input");
    }

    get nextButton(){
        return cy.get("button").contains("Next");
    }

    get createOrganizationButton(){
        return cy.get("button").contains("Create");
    }

    get organizationTitle(){
        return cy.get(".vs-c-my-organization__title");
    }

    createOrg (orgName) {
        this.addNewOrganizatonButton.click();
        this.organizationNameInput.type(orgName);
        this.nextButton.click();
        this.createOrganizationButton.click();
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
