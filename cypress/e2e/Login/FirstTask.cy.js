//import {MYACCOUNT_BASE_URL} from "../../../support/constants/routes";


     // 
     describe('Login Test', () => {
        it('should log in successfully', () => {
            cy.viewport(1920,1000);
            cy.myAccountLogin('09104041465', '900796682*Fap');

              //cy.waitUserDataLoaded();
            cy.wait(8000);
            //
            //cy.get("p[body='تراکنش‌ها'").click();
            cy.dataCy("links:transactions").click();
            cy.wait(5000);
            //cy.get('.Text_sixteen__o5Vu6').contains("تراکنش");
           // cy.get('.Text_sixteen__o5Vu6').should('have.text','تاریخچه تراکنش‌ها');
           cy.get('.mt-4 > .flex > .text-white').should('have.text','تاکنون تراکنشی انجام نداده اید');
        });
    });
      
