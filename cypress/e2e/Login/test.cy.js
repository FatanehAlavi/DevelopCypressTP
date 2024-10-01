
/*describe("Login", () => {
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

// Import the necessary libraries
const { PersianDate } = require('persian-date');

describe('Date Display Test', () => {
  it('Displays the current date in Gregorian and Persian calendars', () => {
    const now = new Date();
    const persianDate = new PersianDate(now);

    // Display the current date using the Gregorian and Persian calendars
    cy.log(`Today in the Gregorian Calendar: ${now.toDateString()}`);
    cy.log(`Today in the Persian Calendar: ${persianDate.format('dddd, YYYY/MM/DD HH:mm:ss')}`);
  });

  it('Displays a specific date in Gregorian and Persian calendars', () => {
    const specificDate = new Date(2013, 4, 28, 10, 35, 0); // Note: Months are 0-indexed in JavaScript
    const persianDate = new PersianDate(specificDate);

    // Display the specific date using the Gregorian and Persian calendars
    cy.log(`Gregorian Calendar: ${specificDate.toDateString()}`);
    cy.log(`Persian Calendar: ${persianDate.format('dddd, YYYY/MM/DD HH:mm:ss')}`);
  });
});
