import HomePage from '../pages/HomePage';
import ProgressBarPage from '../pages/ProgressBarPage';

describe('Widgets - Progress Bar', () => {
  it('should stop at or below 25%, verify visual percentages, complete, and reset', () => {
    const homePage = new HomePage();
    const progressBarPage = new ProgressBarPage();
    homePage.visit();
    progressBarPage.visitFromHome(homePage);

    const targetPercentage = Math.floor(Math.random() * 16) + 5;
    progressBarPage.start();
    progressBarPage.waitForAtLeast(targetPercentage);
    progressBarPage.stop();
    progressBarPage.assertProgressAtMost(25);

    progressBarPage.start();

    [50, 75].forEach((targetPercentage) => {
      progressBarPage.assertProgressAtLeast(targetPercentage);
    });

    progressBarPage.assertProgressEquals(100, 15000);
    progressBarPage.reset();
    progressBarPage.assertProgressEquals(0);
  });
});
