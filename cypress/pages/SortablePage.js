class SortablePage {
  visitFromHome(homePage) {
    homePage.openCategory('Interactions');
    homePage.clickSidebarItem('item-0', 'Sortable');
    cy.visit('https://demoqa.com/sortable');
    cy.get(this.itemSelector()).should('have.length', 6);
  }

  itemSelector() {
    return '.vertical-list-container .list-group-item';
  }

  items() {
    return cy.get(this.itemSelector());
  }

  dragItemBefore(itemText, targetText) {
    return cy.contains(this.itemSelector(), itemText).then(($item) => {
      return cy.contains(this.itemSelector(), targetText).then(($target) => {
        return cy.wrap($item)
          .realMouseDown({ position: 'center' })
          .wrap($target)
          .realMouseMove(0, 0, {
            position: 'center',
            keepMouseDownButton: 'left',
          })
          .realMouseUp();
      });
    });
  }

  dragItemToTop(itemText) {
    return this.items().first().then(($topItem) => {
      const topText = $topItem.text().trim();
      if (topText !== itemText) {
        return this.dragItemBefore(itemText, topText);
      }
    });
  }

  assertOrder(expectedOrder) {
    this.items().should(($items) => {
      const order = [...$items].map((item) => item.textContent.trim());
      expect(order).to.deep.equal(expectedOrder);
    });
  }

  assertItemsAreReordered(originalOrder) {
    this.items().should(($items) => {
      const currentOrder = [...$items].map((item) => item.textContent.trim());
      expect(currentOrder).to.have.members(originalOrder);
      expect(currentOrder).not.to.deep.equal(originalOrder);
    });
  }
}

export default SortablePage;
