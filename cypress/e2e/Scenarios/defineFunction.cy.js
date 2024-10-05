it('google search',function(){
    cy.visit("https:\\google.com")
    cy.get("input[name='q']").type("cypress.enter")


})

//it('google search', () => {


//})