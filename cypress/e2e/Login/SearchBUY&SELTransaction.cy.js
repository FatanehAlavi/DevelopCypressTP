import dayjs from 'dayjs';
const {current_pass} = require("../../support/constants/routes");
const jalaali = require('jalaali-js');

// Function to convert Gregorian date to Jalaali date
function convertToJalaali(gregorianDate) {
  const date = new Date(gregorianDate);
  const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
}


describe('Login Test', () => {
    it('should log in successfully', () => {
        cy.viewport(1920,1000);
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
       cy.get('[aria-rowindex="1"] > [aria-colindex="2"]').click();
       cy.get('[aria-rowindex="1"] > [aria-colindex="2"]')
        .invoke('attr', 'data-value')
        .then((beginDate) => {
               console.log('Begin Date:', beginDate);

               const gregorianDateBegin = dayjs(beginDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)').format('YYYY-MM-DD');
               const jalaaliDateBegin = convertToJalaali(gregorianDateBegin);
              cy.log('Jalaali Date:', jalaaliDateBegin);
      });


       
        
       cy.get('[aria-rowindex="2"] > [aria-colindex="4"] > .text-inherit').click()
       cy.get('[aria-rowindex="2"] > [aria-colindex="4"] > .text-inherit')
       .invoke('attr', 'data-value')
       .then((endDateSt) => {
              // Use endDate here
          console.log('End Date:', endDateSt);
          const gregorianDateEnd = dayjs(endDateSt, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)').format('YYYY-MM-DD');
          const jalaaliDateEnd = convertToJalaali(gregorianDateEnd);
          cy.log('Jalaali Date:', jalaaliDateEnd);
          });
        
     
    


        cy.get("input[type=checkbox]").check(['buy','sell'])
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
            expect(TypeIcon).not.to.deep.equal(['swap-icon','withdraw_rial-icon','deposit_rial-icon','deposit_rial-icon','deposit_currency-icon','withdraw_currency-icon'])
          

          })
 

        })

      })
    


   