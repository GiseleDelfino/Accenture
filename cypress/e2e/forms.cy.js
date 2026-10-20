import HomePage from '../pages/HomePage';
import PracticeFormPage from '../pages/PracticeFormPage';

describe('Forms', () => {
  it('should fill and submit the Practice Form', () => {
    const homePage = new HomePage();
    const practiceFormPage = new PracticeFormPage();
    homePage.visit();
    practiceFormPage.visitFromHome(homePage);

    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan'];
    const lastNames = ['Parker', 'Reed', 'Hayes', 'Brooks'];
    const pickRandom = (values) => values[Math.floor(Math.random() * values.length)];
    const stateCities = {
      NCR: ['Delhi', 'Gurgaon', 'Noida'],
      Haryana: ['Karnal', 'Panipat'],
      Rajasthan: ['Jaipur', 'Jaiselmer'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
    };
    const state = pickRandom(Object.keys(stateCities));
    const city = pickRandom(stateCities[state]);
    const mobileNumber = `9${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`;
    const student = {
      firstName: pickRandom(firstNames),
      lastName: pickRandom(lastNames),
      email: `student${Date.now()}@example.com`,
      gender: 1,
      mobile: mobileNumber,
    };

    practiceFormPage.fillStudentDetails(student);
    practiceFormPage.selectDateOfBirth({ year: 1998, month: 6, day: 15 });
    practiceFormPage.addSubject('Maths');
    practiceFormPage.selectHobby(1);
    practiceFormPage.uploadPicture('C:\\Users\\gdelf\\Desktop\\accenture.txt');
    practiceFormPage.enterAddress('123 Example Street');
    practiceFormPage.selectStateAndCity(state, city);
    practiceFormPage.submit();

    practiceFormPage.assertSubmissionIncludes(
      student.firstName,
      student.lastName,
      student.email,
      'accenture.txt',
      `${state} ${city}`,
    );
    practiceFormPage.closeSubmissionModal();
  });
});