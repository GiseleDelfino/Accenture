class ProgressBarPage {
  visitFromHome(homePage) {
    homePage.openCategory('Widgets');
    cy.contains('li', 'Progress Bar').click();
    cy.url().should('include', '/progress-bar');
  }

  start() {
    cy.get('#startStopButton').should('have.text', 'Start').click();
  }

  stop() {
    cy.get('#startStopButton').should('have.text', 'Stop').click();
  }

  waitForAtLeast(value, timeout = 10000) {
    cy.get('#progressBar [role="progressbar"]', { timeout }).should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.at.least(value);
    });
  }

  assertProgressAtMost(value) {
    cy.get('#progressBar [role="progressbar"]').should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.at.most(value);
      this.assertVisualPercentageMatchesValue($bar);
    });
  }

  assertProgressAtLeast(value, timeout = 15000) {
    cy.get('#progressBar [role="progressbar"]', { timeout }).should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.at.least(value);
      this.assertVisualPercentageMatchesValue($bar);
    });
  }

  assertProgressEquals(value, timeout = 4000) {
    cy.get('#progressBar [role="progressbar"]', { timeout }).should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.equal(value);
      this.assertVisualPercentageMatchesValue($bar);
    });
  }

  reset() {
    cy.contains('button', 'Reset').click();
  }

  assertVisualPercentageMatchesValue($bar) {
    const reportedPercentage = Number($bar.attr('aria-valuenow'));
    const barWidth = $bar[0].getBoundingClientRect().width;
    const trackWidth = $bar[0].parentElement.getBoundingClientRect().width;
    const visualPercentage = (barWidth / trackWidth) * 100;

    expect(visualPercentage).to.be.closeTo(reportedPercentage, 1);
  }
}

export default ProgressBarPage;
