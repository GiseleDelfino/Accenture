import HomePage from '../pages/HomePage';
import SortablePage from '../pages/SortablePage';

const ascendingOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

const getRandomMoveOrder = () => {
  const items = [...ascendingOrder];

  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  if (items[0] === ascendingOrder[0]) {
    [items[0], items[1]] = [items[1], items[0]];
  }

  return items;
};

describe('Interactions - Sortable', () => {
  it('should move all items in random order, then sort them into ascending order', () => {
    const homePage = new HomePage();
    const sortablePage = new SortablePage();
    homePage.visit();
    sortablePage.visitFromHome(homePage);

    const randomMoveOrder = getRandomMoveOrder();
    cy.wrap(randomMoveOrder).each((item) => sortablePage.dragItemToTop(item));
    sortablePage.assertItemsAreReordered(ascendingOrder);

    cy.wrap(ascendingOrder).each((expectedItem, index) => {
      return sortablePage.items().then(($items) => {
        const currentOrder = [...$items].map((item) => item.textContent.trim());
        if (currentOrder[index] !== expectedItem) {
          return sortablePage.dragItemBefore(expectedItem, currentOrder[index]);
        }
      });
    });
    sortablePage.assertOrder(ascendingOrder);
  });
});
