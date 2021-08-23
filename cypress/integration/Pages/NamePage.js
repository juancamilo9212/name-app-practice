

const title = 'h1';

class NamePage{

isTitleDisplayed() {
    const appTitle = 'Registro de Nombres'
    cy.get(title).invoke('text').should('be.equal',appTitle);
}

}

export default new NamePage();