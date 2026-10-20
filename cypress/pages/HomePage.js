class HomePage {
  visit() {
    cy.visit('https://demoqa.com/');
  }

  openCategory(category) {
    cy.contains('.card-body', new RegExp(`^${category}$`)).click();
  }

  clickSidebarItem(itemId, label) {
    cy.contains(`#${itemId}`, label).click({ force: true });
  }
}

export default HomePage;
