class MyOrganizationsPage{

    get addNewOrganizatonButton(){
        return cy.get(".vs-c-my-organization--add-new");
    }

    get organizationNameInput(){
        return cy.get("input");
    }

    get nextButton(){
        return cy.get("button").eq(1);
    }

    get createOrganizationButton(){
        return cy.get("button").eq(1);
    }

    createOrg (orgName) {
        
        this.addNewOrganizatonButton.click().eq(1);
        this.organizationNameInput.type(orgName);
        this.nextButton.click();
        this.createOrganizationButton.click();
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
