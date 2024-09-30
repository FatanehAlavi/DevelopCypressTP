const {current_pass} = require("../../support/constants/routes");

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