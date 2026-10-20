
import HomePage from '../pages/HomePage';
import WebTablesPage from '../pages/WebTablesPage';

describe('Elements - Web Tables', () => {
  it('should add, edit, and delete a record without refreshing', () => {
    const homePage = new HomePage();
    const webTablesPage = new WebTablesPage();
    homePage.visit();
    webTablesPage.visitFromHome(homePage);

    const email = `test${Date.now()}@example.com`;
    const record = {
      firstName: 'Alex',
      lastName: 'Parker',
      email,
      age: 30,
      salary: 50000,
      department: 'Engineering',
    };
    const updatedLastName = 'Reed';

    webTablesPage.addRecord(record);
    webTablesPage.assertRecordContains(email, record.lastName);
    webTablesPage.editLastName(email, updatedLastName);
    webTablesPage.assertRecordContains(email, updatedLastName);
    webTablesPage.deleteRecord(email);
    webTablesPage.assertRecordAbsent(email);
  });
});