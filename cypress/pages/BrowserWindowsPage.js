class BrowserWindowsPage {
  visitFromHome(homePage) {
    homePage.openCategory('Alerts, Frame & Windows');
    cy.contains('li', 'Browser Windows').click();
  }

  stubWindowOpen() {
    cy.window().then((window) => {
      cy.stub(window, 'open').as('openWindow');
    });
  }

  openNewWindow() {
    cy.contains('button', 'New Window').click();
    cy.get('@openWindow').should('have.been.called');
  }

  visitSampleWindow() {
    cy.get('@openWindow').then((openWindow) => {
      const windowUrl = openWindow.firstCall.args[0];
      expect(windowUrl).to.contain('/sample');
      cy.visit(new URL(windowUrl, 'https://demoqa.com/').toString());
    });
  }

  assertSamplePageVisible() {
    cy.contains('This is a sample page').should('be.visible');
  }

  closeSampleWindow() {
    cy.go('back');
    cy.url().should('include', '/browser-windows');
  }
}

export default BrowserWindowsPage;
