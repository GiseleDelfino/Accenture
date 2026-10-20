import HomePage from '../pages/HomePage';
import BrowserWindowsPage from '../pages/BrowserWindowsPage';

describe('Alerts, Frame & Windows', () => {
  it('should open and close the sample browser window', () => {
    const homePage = new HomePage();
    const browserWindowsPage = new BrowserWindowsPage();
    homePage.visit();
    browserWindowsPage.visitFromHome(homePage);
    browserWindowsPage.stubWindowOpen();
    browserWindowsPage.openNewWindow();
    browserWindowsPage.visitSampleWindow();
    browserWindowsPage.assertSamplePageVisible();
    browserWindowsPage.closeSampleWindow();
  });
});