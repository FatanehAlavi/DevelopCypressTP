const {current_pass} = require("../../support/constants/routes");

describe('Register BUY APARTMENT Transaction', () => {
  it('should Register successfully', async () => {
    cy.viewport(1920, 1000);
    //current_pass == "Aaab@123456"
    cy.myAccountLogin('09104041465', current_pass);

    //cy.waitUserDataLoaded();
    cy.wait(4000);
    cy.dataCy('links:change').click()
    cy.wait(6000)
    cy.dataCy('active-tab-0').click()
    cy.wait(2000)
    cy.dataCy('realstate-currency-type').click()
    cy.wait(2000)
    cy.dataCy('select-box-open-currency').click()
    cy.wait(2000)
    cy.dataCy('select-box-dropdown').click()
    cy.wait(2000)
    //cy.dataCy('option-selected-1').click()

    function generateRandomNumber(min, max, decimalPlaces) {
      const randomNumber = Math.random() * (max - min) + min;
      return randomNumber.toFixed(decimalPlaces);
    }

    // Generate a random number between 10,000 and 25,000,000 with up to 8 decimal places
    const randomAmount = generateRandomNumber(0.02, 50, 8);

    // Enter the random number into the input field
    cy.dataCy('enter-amount').clear().type(randomAmount);

    // Validate the entered number
   await cy.get('[data-cy="enter-amount"]').invoke('val').then(value => {
      const regex = /^\d+(\.\d{1,8})?$/;
      const numericValue = Number(value);

      // Check for maximum 8 decimal places
      expect(value).to.match(regex);

      // Check for minimum value
      expect(numericValue).to.be.at.least(0.02);

      // Check for maximum value
      expect(numericValue).to.be.at.most(50);
      cy.wait(5000)
      cy.dataCy('preview-calculate').invoke('text').then((text) => {
        const value = parseFloat(text);
        expect(value).to.not.equal(0);
      })
    })
      cy.dataCy('next').click();
      cy.wait(2000);
      cy.dataCy('toggle').then(($toggle) => {
     
      if ($toggle.is(':checked')) {
        cy.dataCy('toggle').click({force :true});
      } else {
        cy.dataCy('toggle').should('not.be.checked')
    
      }
    })
    cy.wait(2000);
    cy.dataCy('pay-button').click();
    cy.wait(6000);
      cy.get('id=["success-button"]').click()

      cy.get('div > .gateway_texts__flRkd > p[0]').should('have.text','پرداخت با موفقیت انجام شد');


    });
  });

