class WebTablesPage {
  visitFromHome(homePage) {
    homePage.openCategory('Elements');
    homePage.clickSidebarItem('item-3', 'Web Tables');
    cy.visit('https://demoqa.com/webtables');
    cy.contains('h1', 'Web Tables').should('be.visible');
  }

  showRecordsPerPage(count) {
    cy.get('select').select(String(count));
  }

  addRecord(record) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(record.firstName);
    cy.get('#lastName').type(record.lastName);
    cy.get('#userEmail').type(record.email);
    cy.get('#age').type(String(record.age));
    cy.get('#salary').type(String(record.salary));
    cy.get('#department').type(record.department);
    cy.get('#submit').click();
  }

  editLastName(email, lastName) {
    this.getRecordRow(email).within(() => {
      cy.get('[title="Edit"]').click({ force: true });
    });
    cy.get('#lastName').clear().type(lastName);
    cy.get('#submit').click();
  }

  deleteRecord(email) {
    this.getRecordRow(email).within(() => {
      cy.get('[title="Delete"]').click({ force: true });
    });
  }

  assertRecordContains(email, text) {
    this.getRecordRow(email).should('contain.text', text);
  }

  assertRecordVisible(email) {
    cy.contains(email).should('be.visible');
  }

  assertRecordAbsent(email) {
    cy.contains(email).should('not.exist');
  }

  deleteRecordIfPresent(email) {
    cy.get('body').then(($body) => {
      const row = $body.find('tr').filter((_, element) =>
        element.innerText.includes(email),
      );

      // DemoQA can remove all newly added rows after a single Delete click.
      if (row.length) {
        cy.wrap(row).find('[title="Delete"]').click({ force: true });
      }
    });
  }

  getRecordRow(email) {
    return cy.contains(email).parents('tr');
  }
}

export default WebTablesPage;
