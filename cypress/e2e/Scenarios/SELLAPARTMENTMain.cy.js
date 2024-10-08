const { current_pass } = require("../../support/constants/routes");

describe('Register BUY APARTMENT Transaction', () => {
  it('should Register successfully', () => {
    cy.viewport(1920, 1000);
    cy.myAccountLogin('09104041465', current_pass);
    cy.wait(8000);
    cy.dataCy('links:wallet').click();
    cy.wait(2000);

    const baseSelector = 'div:nth-child(6) div:nth-child(1) div:nth-child(3)';
    const financialwallet = [];

    // Collect financial wallet data
    for (let i = 1; i <= 3; i++) {
      const selector = `${baseSelector} div:nth-child(${i}) div:nth-child(1) div:nth-child(1) div:nth-child(2) p:nth-child(1)`;
      cy.get(selector).invoke('text').then(text => {
        financialwallet.push(text.trim());  // Ensure trimming spaces
      });
    }

    // Wait for the financialwallet array to be populated
    cy.wrap(financialwallet).should('have.length', 3).then(() => {
      cy.log('Collected financialwallet:', financialwallet);
    });

    cy.dataCy('links:change').click();
    cy.wait(6000);
    cy.dataCy('active-tab-1').click();
    cy.wait(6000);
    cy.dataCy('realstate-currency-type').click();
    cy.dataCy('select-box-open-assets').click();

    const Assetdisplay = [];

    // Collect Assetdisplay data
    for (let i = 0; i <= 2; i++) {
      cy.get(`[data-cy="option-selected-${i}"]`).invoke('text').then(text => {
        Assetdisplay.push(text.trim());  // Ensure trimming spaces
      });
    }
    
    // Wait for Assetdisplay array to be populated
    cy.wrap(Assetdisplay).should('have.length', 3).then(() => {
      cy.log('Collected Assetdisplay:', Assetdisplay);

      // Compare the two arrays after both are populated
      //expect(Assetdisplay).contains(financialwallet);

      const normalizeArray = (arr) => {
        return arr.map(item => item.replace(/Zone \d+/g, '').trim());
      };
  
      // Normalize the second array
      const normalizedArray2 = normalizeArray(Assetdisplay);
  
      // Compare the normalized array2 with array1
      cy.wrap(financialwallet).should('deep.equal', normalizedArray2);


    });

    // Additional logic for form inputs and checks
    cy.dataCy('option-selected-0').click();

    // Random amount generation and input
    function generateRandomNumber(min, max, decimalPlaces) {
      const randomNumber = Math.random() * (max - min) + min;
      return randomNumber.toFixed(decimalPlaces);
    }

    const randomAmount = generateRandomNumber(1, 10, 8);
    cy.dataCy('enter-amount').clear().type(randomAmount);

    // Validate the entered number
    cy.get('[data-cy="enter-amount"]').invoke('val').then(value => {
      const regex = /^\d+(\.\d{1,8})?$/;
      const numericValue = Number(value);

      expect(value).to.match(regex); // Check for decimal format
      expect(numericValue).to.be.at.least(1); // Check for min value
      expect(numericValue).to.be.at.most(10); // Check for max value
    });

    cy.wait(5000);
    cy.dataCy('preview-calculate').invoke('text').then((PreviewCalc) => {
      cy.dataCy('submit').click();
      cy.wait(5000);

      // Validate final text value after submission
      cy.get("p[class='Text_base__e_8ut text- text-[#9a9a9a] font-medium']", { timeout: 10000 })
        .invoke('text')
        .then((TextValue) => {
          const TextValue1 = TextValue.replace(/\s+/g, '');
          expect(TextValue1).to.contain(PreviewCalc);
        });

      // Check success message
      cy.dataCy('modal-content').should('have.text', ' درخواست فروش با موفقیت ثبت شد');
    });
  });
});
