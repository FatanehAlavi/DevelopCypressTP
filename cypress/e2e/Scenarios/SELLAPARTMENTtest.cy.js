    const {current_pass} = require("../../support/constants/routes");

    describe('Register BUY APARTMENT Transaction', () => {
      it('should Register successfully', async () => {
        cy.viewport(1920, 1000);
        //current_pass == "Aaab@123456"
        cy.myAccountLogin('09104041465', current_pass);
        cy.wait(8000)
        cy.dataCy('links:wallet').click();
        cy.wait(2000)

        const baseSelector = 'div:nth-child(6) div:nth-child(1) div:nth-child(3)';
        const financialwallet = [];

        for (let i = 1; i <= 3; i++) {
          const selector = `${baseSelector} div:nth-child(${i}) div:nth-child(1) div:nth-child(1) div:nth-child(2) p:nth-child(1)`;
          cy.get(selector).invoke('text').then(text => {
            financialwallet.push(text);
          });
        }

        cy.wrap(financialwallet).should('have.length', 3).then(() => {
          cy.log('Collected financialwallet:', financialwallet);
        });

      

        cy.dataCy('links:change').click();
        cy.wait(6000)
        cy.dataCy('active-tab-1').click()
        cy.wait(6000)
        cy.dataCy('realstate-currency-type').click()
        cy.dataCy('select-box-open-assets').click()



        const Assetdisplay = [];

        for (let i = 1; i <= 3; i++) {
          const selector = cy.dataCy(`[data-cy="option-selected-${i}"]`);
          cy.get(selector).invoke('text').then(text => {
            Assetdisplay.push(text);
          });
        }
    
        cy.wrap(Assetdisplay).should('have.length', 3).then(() => {
          cy.log('Collected Assetdisplay:', Assetdisplay);
        });

        expect(financialwallet).to.deep.equal(Assetdisplay);

    cy.dataCy('option-selected-0').click()

    //cy.dataCy('sale-total-inventory-button').click()

    function generateRandomNumber(min, max, decimalPlaces) {
        const randomNumber = Math.random() * (max - min) + min;
        return randomNumber.toFixed(decimalPlaces);
      }

      // Generate a random number between 10,000 and 25,000,000 with up to 8 decimal places
      const randomAmount = generateRandomNumber(1, 10, 8);

      // Enter the random number into the input field
      cy.dataCy('enter-amount').clear().type(randomAmount);

      // Validate the entered number
      await cy.get('[data-cy="enter-amount"]').invoke('val').then(value => {
        const regex = /^\d+(\.\d{1,8})?$/;
        const numericValue = Number(value);

        // Check for maximum 8 decimal places
        expect(value).to.match(regex);

        // Check for minimum value
        expect(numericValue).to.be.at.least(1);

        // Check for maximum value
        expect(numericValue).to.be.at.most(10);
    })
        cy.wait(5000)
        cy.dataCy('preview-calculate').invoke('text').then((text) => {
          const value = parseFloat(text);
          expect(value).to.not.equal(0);
        })
      
        cy.dataCy('preview-calculate').invoke('text').then((PreviewCalc) => {


        cy.dataCy('submit').click();
        cy.wait(5000)
        cy.get("p[class='Text_base__e_8ut text- text-[#9a9a9a] font-medium']", { timeout: 10000 }).invoke('text').then((TextValue) => {
            const TextValue1 = TextValue.replace(/\s+/g, '')
            expect (TextValue1).contains(PreviewCalc);

        })
            
        cy.dataCy('modal-content').should('have.text',' درخواست فروش با موفقیت ثبت شد')
        

      })
    })

    })