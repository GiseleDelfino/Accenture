class PracticeFormPage {
  visitFromHome(homePage) {
    homePage.openCategory('Forms');
    cy.contains('li', 'Practice Form').click();
    cy.url().should('include', '/automation-practice-form');
  }

  fillStudentDetails({ firstName, lastName, email, gender, mobile }) {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get(`label[for="gender-radio-${gender}"]`).click();
    cy.get('#userNumber').type(mobile);
  }

  selectDateOfBirth({ year, month, day }) {
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select(String(year));
    cy.get('.react-datepicker__month-select').select(String(month));
    cy.get(`.react-datepicker__day--${String(day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`).click();
  }

  addSubject(subject) {
    cy.get('#subjectsInput').type(subject);
    cy.get('.subjects-auto-complete__option')
      .contains(subject)
      .click({ force: true });
  }

  selectHobby(hobbyId) {
    cy.get(`#hobbies-checkbox-${hobbyId}`).check({ force: true });
  }

  uploadPicture(filePath) {
    cy.get('#uploadPicture').selectFile(filePath, { force: true });
  }

  enterAddress(address) {
    cy.get('#currentAddress').type(address, { force: true });
  }

  selectStateAndCity(state, city) {
    cy.get('#state input').type(`${state}{enter}`);
    cy.get('#city input').type(`${city}{enter}`);
  }

  submit() {
    cy.get('#submit').should('be.visible').and('be.enabled').click();
  }

  assertSubmissionIncludes(...values) {
    cy.get('.modal-title')
      .should('be.visible')
      .and('have.text', 'Thanks for submitting the form');
    values.forEach((value) => {
      cy.get('.modal-body').should('contain.text', value);
    });
  }

  closeSubmissionModal() {
    cy.on('uncaught:exception', (error) => {
      if (error.message.includes('Lr.findDOMNode is not a function')) {
        return false;
      }
    });
    cy.get('#closeLargeModal')
      .should('be.visible')
      .and('be.enabled')
      .realClick();
    cy.get('.modal-title').should('not.exist');
  }
}

export default PracticeFormPage;
