import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // ---------------- initial e2e tests

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Matching Algorithm Animator');
  });

  it('should display subtitle', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Created by Liam Lau');
  });

  it('algorithm dropdown appears', () => {
    page.navigateTo();
    expect(element(by.id('algorithmDropdown')).isPresent()).toBeTruthy();
  });

  // ---------------- simple e2e tests

  it('can navigate to simple algorithm page using dropdown', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Simple')).click();
  });

  it('simple algorithm page displays playback tools properly', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Simple')).click();

    expect(element(by.css('#restartButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#backButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#playButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#forwardButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#endButton')).isPresent()).toBeTruthy();
  });

  it('simple algorithm page displays code properly', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Simple')).click();
    expect(element(by.css('#line4')).getText()).toContain("this is now 5!");
  });

  // ----------------  gale-shapley e2e tests

  it('can navigate to gale-shapley algorithm page using dropdown', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();
  });

  it('gale-shapley algorithm page displays playback tools properly', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();

    expect(element(by.css('#restartButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#backButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#playButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#forwardButton')).isPresent()).toBeTruthy();
    expect(element(by.css('#endButton')).isPresent()).toBeTruthy();
  });

  it('gale-shapley algorithm page displays code properly', () => {
    page.navigateTo();
    element(by.id('algorithmDropdown')).click();
    element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();

    expect(element(by.css('#line4')).getText()).toContain("if w is free then");
  });

  // need to wait 400ms?
  // it('gale-shapley algorithm page displays variables properly after clicking play', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();

  //   browser.waitForAngularEnabled(false);

  //   expect(element(by.css('div')).getText()).not.toContain("Free Men");

  //   element(by.css('#playButton')).click();
  //   element(by.css('#playButton')).click();

  //   // element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();
  //   let elText = element(by.css('div')).getText();
  //   expect(elText).toContain("Free Men");
  //   expect(elText).toContain("Men");
  //   expect(elText).toContain("Matches");
  //   expect(elText).toContain("Women");
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
