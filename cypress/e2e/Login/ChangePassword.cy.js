//import {current_pass} from "../../../support/constants/routes"

const {current_pass} = require("../../support/constants/routes");

describe('Login Test', () => {
    it('should log in successfully', () => {
        cy.viewport(1920,1000);
        //current_pass == "Aaab@123456"
        cy.myAccountLogin('09104041465', current_pass);

          //cy.waitUserDataLoaded();
        cy.wait(6000);

        cy.dataCy("links:profile").click()
        cy.dataCy("change-password-open-modal").click()
        cy.wait(3000)
       
        cy.dataCy("current-password-input").type(current_pass)

        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const NewPass = id +"@AaBbCc"

        cy.dataCy("new-password-input").type(NewPass)
        cy.dataCy("confirm-new-password-input").type(NewPass)
        cy.dataCy("confirm-modal-btn").click()   
        
        cy.wait(8000)

        cy.get("div[role='alert'] div:nth-child(2)").should('have.text','رمز عبور با موفقیت تغییر کرد.');


    


    })


    })