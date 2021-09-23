'use strict'

describe("prueba contacto", ()=>{

    beforeEach(()=>{
        cy.visit('/contacto')

    })

    /*
    it("visitando contacto",()=>{
        cy.visit('/contacto')
    })
    */

    it("Debe ingresar todos los datos correctamente y enviar", ()=>{
        
        cy.get('#name').type('nombre de prueba')
        cy.get('#lastname').type('apellido de prueba')
        cy.get('#email').type('email-prueba@prueba.com')
        cy.get('#message').type('mensaje de prueba')
        cy.contains('#send', 'Enviar').click()
        cy.wait(3000)
        cy.get('.text-danger').should('not.exist') //no se debe mostrar un text danger
    

    })


    it("Debe ingresar algunos datos incorrectamente y enviar", ()=>{
        
        cy.get('#name').type('john93')
        cy.get('#lastname').type('apellido de prueba')
        cy.get('#email').type('email-prueba@')
        cy.get('#message').type('mensaje de prueba')
        cy.contains('#send', 'Enviar').click()
        cy.wait(3000)
        cy.get('.text-danger').should('be.visible') //no se debe mostrar un text danger

    })

    after( ()=>{
        cy.log('Test Finalizados')
    })


    
})