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

import {API_AUTH_BASE_URL, BASE_URL, API_ACCOUNTING_BASE_URL, MYACCOUNT_LOGIN_URL} from "./constants/routes";

Cypress.Commands.add("dataCy", (selector) => {
    return cy.get(`[data-cy="${selector}"]`)
});

Cypress.Commands.add('myAccountLogin', (phoneNumber, password) => {
    cy.visit(`${MYACCOUNT_LOGIN_URL}`);
    cy.dataCy('phone').type(phoneNumber);
    cy.dataCy('password').type(password);
    cy.dataCy('submit').click();
});


Cypress.Commands.add('waitUserDataLoaded', () => {

    cy.intercept({
        method: "GET",
        url: `${API_AUTH_BASE_URL}/users/myaccount/user-info/`,
    }).as("getUserInfo");
    cy.wait('@getUserInfo', { timeout: 10000 }).its('response').then((response) => {
        expect(response?.statusCode).to.eq(200);
        expect(response?.body).to.have.property('username');
        cy.log(JSON.stringify(response?.body));
        cy.log('user data has successfully loaded');
    });

});




Cypress.Commands.add('waitNextLoaded', () => {

    cy.intercept({
        method: "GET",
        url: `https://myaccount.faraswap.icu/_next/data/WCcf2rH4n9RS_0D1Bu_OD/fa/change.json`,
    }).as("getTradeInfo");
    cy.wait('@getTradeInfo', { timeout: 20000 }).its('response').then((response) => {
        expect(response?.statusCode).to.eq(200);
        expect(response?.body).to.have.property('required_deposit');
        cy.log(JSON.stringify(response?.body));
        cy.log('Trade data has successfully loaded');
    });

});

