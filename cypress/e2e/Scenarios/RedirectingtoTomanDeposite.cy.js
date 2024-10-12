const {current_pass} = require("../../support/constants/routes");

describe('Register BUY APARTMENT Transaction', () => {
  it('should Register successfully', async () => {
    cy.viewport(1920, 1000);
    //current_pass == "Aaab@123456"
    cy.myAccountLogin('09104041465', current_pass);

    //cy.waitUserDataLoaded();
    cy.wait(6000)
    cy.dataCy('links:wallet').click()
    cy.wait(4000)
    cy.dataCy('deposit').click()
    cy.wait(3000)
    cy.dataCy('radioGroup').siblings('p').should('include.text', 'تومان');



});
});