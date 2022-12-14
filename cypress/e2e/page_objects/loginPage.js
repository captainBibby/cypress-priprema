class LoginPage {

    get emailInput() {
        return cy.get("input").eq(0);
    }

    get passwordInput() {
        return cy.get("input").eq(1);
    }

    get loginButton() {
        return cy.get("button").eq(0);
    }

    get loginHeading(){
        return cy.get("h1")
      }

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
      }
}

export const loginPage = new LoginPage();