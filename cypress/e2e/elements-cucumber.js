import {
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '../pages/HomePage';
import WebTablesPage from '../pages/WebTablesPage';

Given("I am on the DemoQA Web Tables page", () => {
  const homePage = new HomePage();
  const webTablesPage = new WebTablesPage();
  homePage.visit();
  webTablesPage.visitFromHome(homePage);
  webTablesPage.showRecordsPerPage(20);
});

When("I create {int} dynamically generated records", function (count) {
  const runId = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  this.generatedRecords = Array.from({ length: count }, (_, index) => ({
    firstName: `Cucumber${index + 1}`,
    lastName: `Run${runId}`,
    email: `cucumber-${runId}-${index + 1}@example.com`,
    age: String(20 + (index % 30)),
    salary: String(40000 + index * 100),
    department: "Quality Assurance",
  }));

  cy.wrap(this.generatedRecords).each((record) => {
    new WebTablesPage().addRecord(record);
  });
});

Then("all {int} generated records should be visible", function (count) {
  expect(this.generatedRecords).to.have.length(count);
  cy.wrap(this.generatedRecords).each((record) => {
    new WebTablesPage().assertRecordVisible(record.email);
  });
});

When("I delete all generated records", function () {
  const webTablesPage = new WebTablesPage();
  cy.wrap(this.generatedRecords).each((record) => {
    webTablesPage.deleteRecordIfPresent(record.email);
  });
});

Then("none of the generated records should remain", function () {
  cy.wrap(this.generatedRecords).each((record) => {
    new WebTablesPage().assertRecordAbsent(record.email);
  });
});
