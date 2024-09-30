const {current_pass} = require("../../support/constants/routes");
//const ticketdesc = "DescriptionTest"

describe('Login Test', () => {
    it('should log in successfully', () => {
        cy.viewport(1920,1000);
        //current_pass == "Aaab@123456"
        cy.myAccountLogin('09104041465', current_pass);

          //cy.waitUserDataLoaded();
        cy.wait(6000);
        cy.dataCy("help-center").click()
        cy.wait(6000);
        cy.dataCy("active-tab-1").click()
        cy.wait(2000);
        cy.dataCy("create-new").click()
        cy.wait(3000)
        //cy.get('.css-19bb58m').click().get('#react-select-3-option-0').click()
        
        cy.get('.css-19bb58m').as('dropdown');
        cy.get('@dropdown').click();
        cy.get('#react-select-3-option-0').as('firstOption');
        cy.get('@firstOption').click();asdasd
        let ticketdesc = 'DescriptionTest'
        cy.get('textarea').type(ticketdesc)
        //cy.get('div > input[type=file]').scrollIntoView()
        //cy.get('div > input[type=file]').selectFile("C:\\Users\\Office\\TestAutomation\\cypress\\Pics\\1.png")  (not work because the element was hidden)
        //cy.get('input[type="file"]').selectFile("C:\\Users\\Office\\TestAutomation\\cypress\\Pics\\1.png")
        //(For Upload File need to change UI code so now i dot it manually)
        cy.wait(5000)
        cy.get('button').contains("ثبت تیکت").click()
        cy.wait(6000);
        cy.dataCy("active-tab-1").click()
        cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > .Button_root__X2EZa').click()
        cy.get(".text-sm font-medium text-white").should('have.text',ticketdesc);



    })


    })