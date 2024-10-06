const {current_pass} = require("../../support/constants/routes");

describe('Register BUY APARTMENT Transaction', () => {
  it('should Register successfully', async () => {
    cy.viewport(1920, 1000);
    //current_pass == "Aaab@123456"
    cy.myAccountLogin('09104041465', current_pass);
    cy.wait(8000)
    /*cy.dataCy('links:wallet').click();
    cy.wait(2000)
    cy.get(':nth-child(6) > .bg-black-100 > .Table_headText__g_IxT > .Text_twenty__48SNL').should('have.to','آپارتمان مسکونی').then()
    cy.get(':nth-child(6) > .bg-black-100 > .Table_body__b1GN4 > :nth-child(1) > [style="width: 240px;"] > .CoinNameBadge_wrapper__w8tKv > :nth-child(2) > .Text_xm__PheHY').then(($list){



    })

// Define an empty array to store the attribute values
let attributeValues = [];
const firstvalue = cy.get(':nth-child(6) > .bg-black-100 > .Table_body__b1GN4 > :nth-child(1) > [style="width: 240px;"] > .CoinNameBadge_wrapper__w8tKv > :nth-child(2) > .Text_xm__PheHY')
// Get the elements and extract the attribute values
cy.get(':nth-child(6) > .bg-black-100 > .Table_body__b1GN4 > :nth-child(1) > [style="width: 240px;"] > .CoinNameBadge_wrapper__w8tKv > :nth-child(2) > .Text_xm__PheHY').each(($el) => {
  // Get the attribute value
  cy.wrap($el).invoke('attr', '').then((attrValue) => {
    // Push the attribute value to the array
    attributeValues.push(attrValue);
  });
}).then(() => {
  // Log the array to the console
  cy.log(attributeValues);
  // You can also perform further actions with the array here
});
*/
debugger;
cy.dataCy('links:change').click();
cy.wait(6000)
cy.dataCy('active-tab-1').click()
cy.wait(6000)
cy.dataCy('realstate-currency-type').click()
cy.dataCy('select-box-open-assets').click()
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
debugger;
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
   debugger;
    cy.dataCy('preview-calculate').invoke('text').then((PreviewCalc) => {


    cy.dataCy('submit').click();
    cy.wait(5000)
    cy.get("p[class='Text_base__e_8ut text- text-[#9a9a9a] font-medium']", { timeout: 10000 }).invoke('text').then((TextValue) => {
        expect (TextValue).contains(PreviewCalc);

    })
        
    cy.dataCy('modal-content').should('have.text',' درخواست فروش با موفقیت ثبت شد')
    

  })
})

})