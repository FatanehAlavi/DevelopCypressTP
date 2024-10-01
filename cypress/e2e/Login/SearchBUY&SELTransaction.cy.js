import dayjs from 'dayjs';
const { current_pass } = require("../../support/constants/routes");
const jalaali = require('jalaali-js');
const englishToPersianMap = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹'
};
//Function to convert english numbers to persian
function convertEnglishtoPersian(number){
   
    return number.toString().split('').map(digit => englishToPersianMap[digit] || digit).join('');
  }


// Function to convert Gregorian date to Jalaali date
function convertToJalaali(gregorianDate) {
  const date = new Date(gregorianDate);
  const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
}


describe('Login Test', () => {
  it('should log in successfully', async () => {
    cy.viewport(1920, 1000);
    //current_pass == "Aaab@123456"
    cy.myAccountLogin('09104041465', current_pass);

    //cy.waitUserDataLoaded();
    cy.wait(6000);

    cy.dataCy("links:transactions").click();
    cy.wait(3000);
    cy.dataCy("transaction-open-modal-handler").click()
    cy.wait(2000)
    //cy.wait(1000)
    // cy.dataCy("buy-checkbox").should("not.be.checked")
    //cy.dataCy("buy-checkbox").check()
    //cy.wait(1000)
    // cy.dataCy("buy-checkbox").should("checked")
    // cy.dataCy("sell-checkbox").should("not.be.checked")
    //cy.dataCy("sell-checkbox").check()
    //it('check BUY&SELL', () => {
    //const beginDateSt =''

    let jalaaliDateBegin, jalaaliDateEnd;
    cy.get('[aria-rowindex="1"] > [aria-colindex="2"]').click();
    const beginDataValue = await cy.get('[aria-rowindex="1"] > [aria-colindex="2"]').invoke('attr', 'data-value');
    console.log('Begin Date:', beginDataValue);

    const gregorianDateBegin = dayjs(beginDataValue, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)').format('YYYY-MM-DD');
    jalaaliDateBegin = convertToJalaali(gregorianDateBegin);
    jalaaliDateBegin = dayjs(jalaaliDateBegin).format('YYYY/MM/D');
    cy.wrap(jalaaliDateBegin).as('jalaaliDateBegin');

    cy.get('[aria-rowindex="2"] > [aria-colindex="4"] > .text-inherit').click()
    const endDataValue = await cy.get('[aria-rowindex="2"] > [aria-colindex="4"] > .text-inherit').invoke('attr', 'data-value');
     // Use endDate here
     console.log('End Date:', endDataValue);
     const gregorianDateEnd = dayjs(endDataValue, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)').format('YYYY-MM-DD');
     jalaaliDateEnd = convertToJalaali(gregorianDateEnd);
     jalaaliDateEnd = dayjs(jalaaliDateEnd).format('YYYY/MM/D');
     cy.wrap(jalaaliDateEnd).as('jalaaliDateEnd');

    cy.get("input[type=checkbox]").check(['buy', 'sell'])
    // })
    cy.dataCy("confirm-modal-btn").click()
    // cy.dataCy("transaction-card-wrapper").dataCy("withdraw_rial-icon").within( function() {
    /*cy.dataCy("transaction-card-wrapper").within( function() {
 
       cy.should('have.value',['sell-icon','buy-icon'])
    })*/
    /* cy.dataCy("filter-tag-wrapper").dataCy("transaction-card-wrapper").each(($el) => {
         cy.wrap($el).within(() => {

           cy.dataCy("withdraw_rial-icon").invoke('attr', 'data-cy').should('have.value',["sell-icon","buy-icon"])
         });
       });
       */

    cy.dataCy('transaction-card-wrapper').get('.p-1').then(($indicators) => {
      const TypeIcon = $indicators.get().map((i) => i.getAttribute('data-cy'));
      expect(TypeIcon).not.to.deep.equal(['swap-icon', 'withdraw_rial-icon', 'deposit_rial-icon', 'deposit_rial-icon', 'deposit_currency-icon', 'withdraw_currency-icon'])
    });
    /* let SelectedPeriodTime = cy.dataCy ("tag-close").text()
     expect(CompareDattaBuild).to.deep.equal(SelectedPeriodTime)
    */
     const jalaaliDateBeginP = convertEnglishtoPersian(jalaaliDateBegin);
     cy.log(jalaaliDateBeginP);
     const jalaaliDateEndP = convertEnglishtoPersian(jalaaliDateEnd);
     cy.log(jalaaliDateEndP);

    const symbol = '-';
    const CompareDateBuild = `${jalaaliDateBeginP} - ${jalaaliDateEndP}`;
    cy.get('.justify-center > [data-cy="filter-tag-wrapper"] > :nth-child(3)').invoke('text').then((text) => {
      expect(text.trim()).contain(CompareDateBuild)
    });

  })

})



