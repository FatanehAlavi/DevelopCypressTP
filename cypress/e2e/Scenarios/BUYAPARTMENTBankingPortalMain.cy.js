const { current_pass } = require("../../support/constants/routes");

describe('Register BUY APARTMENT Transaction', () => {
  it('should Register successfully', () => {
    debugger;
    cy.viewport(1920, 1000);

    debugger;
    // Log in to my account
    cy.myAccountLogin('09104041465', current_pass);
    cy.wait(6000);

    // Click to change user data
    cy.dataCy('links:change').click();
    cy.wait(6000);
debugger;
    // Navigate to the first active tab
    cy.dataCy('active-tab-0').click();
    cy.dataCy('realstate-currency-type').click();
    cy.wait(2000);

    // Select the currency
    cy.dataCy('select-box-open-currency').click();
    cy.wait(2000);
    cy.dataCy('select-box-dropdown').click();
    cy.wait(2000);

    // Generate random amount between 0.02 and 10 with up to 8 decimal places
    function generateRandomNumber(min, max, decimalPlaces) {
      const randomNumber = Math.random() * (max - min) + min;
      return randomNumber.toFixed(decimalPlaces);
    }
    const randomAmount = generateRandomNumber(0.02, 10, 8);

    // Enter random amount
    cy.dataCy('enter-amount').clear().type(randomAmount);

    // Validate the entered amount
    cy.get('[data-cy="enter-amount"]').invoke('val').then(value => {
      const regex = /^\d+(\.\d{1,8})?$/;
      const numericValue = Number(value);

      // Check for valid amount format
      expect(value).to.match(regex);
      expect(numericValue).to.be.at.least(0.02);
      expect(numericValue).to.be.at.most(10);
    });

    // Preview calculation and validation
    cy.wait(5000);
    cy.dataCy('preview-calculate').invoke('text').then(text => {
      const value = parseFloat(text);
      expect(value).to.not.equal(0);
    });

    // Click 'Next'
    cy.wait(3000);
    cy.dataCy('next').click();
    cy.wait(2000);

    // Toggle option
    cy.dataCy('toggle').then($toggle => {
      if ($toggle.is(':checked')) {
        cy.dataCy('toggle').click({ force: true });
      } else {
        cy.dataCy('toggle').should('not.be.checked');
      }
    });
debugger;
    // Click the 'Pay' button
    cy.wait(2000);
 
    cy.dataCy('pay-button').click();
    cy.wait(10000);
    cy.url().then((url) => {
        cy.log('Current URL is: ' + url)
      })
      cy.origin('https://gateway.zibal.ir', () => {
    // Validate the URL contains the expected path
   // cy.url().should('include', 'https://gateway.zibal.ir/start/3784200147');

    // Click the success button
    cy.get('button[id="success-button"] span').click();
});
cy.wait(8000)
cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen').callsFake((url) => {
          // Open the URL in the same tab
          cy.visit(url);
        });
      });
    // Validate successful payment message
    cy.origin('https://myaccount.faraswap.icu/gateway-callback-accept?transaction_id=815', () => {

        cy.dataCy('payment-status-text').eq(0).should('have.text', 'پرداخت با موفقیت انجام شد');

    });
    
  
});
});
