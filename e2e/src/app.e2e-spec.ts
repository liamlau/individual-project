import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    // expect(page.getTitleText()).toEqual('individual-project app is running!');
  });

  it('algorithm dropdown appears', () => {
    page.navigateTo();
    expect(element(by.id('algorithmDropdown')).isPresent()).toBeTruthy();
  });

  it('can navigate to simple algorithm page using dropdown', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Simple')).click();
  });

  it('can navigate to gale-shapley algorithm page using dropdown', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
