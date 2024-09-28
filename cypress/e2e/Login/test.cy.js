
describe("Login", () => {
  it("Login", () => {
   // cy.viewport(1920,1000)
    cy.visit('https://myaccount.faraswap.icu');
    cy.dataCy("phone").click().type("09104041465");
    cy.dataCy("password").click().type("900796682*Fap");
    //cy.dataCy("phone")
    cy.dataCy("submit").click();

    //cy.waitUserDataLoaded();
    cy.wait(10000);
    //
    //cy.get("p[body='تراکنش‌ها'").click();
    cy.get('.flex-row > [href="/transactions"]').click();
    cy.wait(5000);
    //cy.get('.Text_sixteen__o5Vu6').contains("تراکنش");
    cy.get('.Text_sixteen__o5Vu6').should('have.text','تاریخچه تراکنش‌ها');


    
  });
/*
  it("Enter Username & Password",() =>{
   // cy.get(input[name='phone']).type('09104041465')
   // cy.get(input[name='password'].type('900796682*Fap'))
   cy.dataCy("phone").click().type("09104041465");
   cy.dataCy("password").click().type("900796682*Fap");

   //cy.dataCy(submit).click()





 / })
 */
});