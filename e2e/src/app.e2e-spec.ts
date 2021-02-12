import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // // ---------------- initial e2e tests

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Learn, visualise and walk');
  });

  it('should display logo', () => {
    page.navigateTo();
    expect(page.getLogoAlg()).toContain('alg');
    expect(page.getLogoMatch()).toContain('match');
  });

  it('navbar links should appear', () => {
    page.navigateTo();
    expect(element(by.css('#homeLink')).isPresent()).toBeTruthy();
    expect(element(by.css('#aboutLink')).isPresent()).toBeTruthy();
    expect(element(by.css('#algorithmsLink')).isPresent()).toBeTruthy();
    expect(element(by.css('#feedbackLink')).isPresent()).toBeTruthy();
  });

  it('video should appear', () => {
    page.navigateTo();
    expect(element(by.css('#animationVideo')).isPresent()).toBeTruthy();
  });

  it('home page text should appear', () => {
    page.navigateTo();
    expect(page.getHomePageRow1Text()).toContain('Perfect for beginners');
    expect(page.getHomePageRow1Text()).toContain('With a simple, intuitive interface, learn how the Gale-Shapley and Extended Gale-Shapley matching algorithms work in different problems with step-by-step playback.');

    expect(page.getHomePageRow2Text()).toContain('Learn visually');
    expect(page.getHomePageRow2Text()).toContain('Decide to play each algorithm with pseudocode shown or not in conjunction with a visual representation of matching.');

    expect(page.getHomePageRow3Text()).toContain('Control your learning');
    expect(page.getHomePageRow3Text()).toContain('Use the playback controls for each algorithm to control the speed you learn.');
  });

  it('home page images should appear', () => {
    page.navigateTo();
    expect(element(by.css('#homePageRow1Content')).isPresent()).toBeTruthy();
    expect(element(by.css('#homePageRow2Content')).isPresent()).toBeTruthy();
    expect(element(by.css('#homePageRow3Content')).isPresent()).toBeTruthy();
  });

  it('feedback banner should appear', () => {
    page.navigateTo();
    expect(element(by.css('#feedbackBanner')).isPresent()).toBeTruthy();
  });

  it('feedback banner text should appear', () => {
    page.navigateTo();
    expect(page.getFeedbackBannerText()).toContain('If you have any feedback for me, or anything you\'d like to see in this app, click the button below to email me or contact me at one of my socials!');
    expect(page.getFeedbackBannerText()).toContain('I\'m currently actively working on the app, however as it is part of my final year university project, I will eventually stop.');
  });

  // // ---------------- simple e2e tests

  // it('can navigate to simple algorithm page using dropdown', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Simple')).click();
  // });

  // it('simple algorithm page displays playback tools properly', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Simple')).click();

    // expect(element(by.css('#restartButton')).isPresent()).toBeTruthy();
    // expect(element(by.css('#backButton')).isPresent()).toBeTruthy();
    // expect(element(by.css('#playButton')).isPresent()).toBeTruthy();
    // expect(element(by.css('#forwardButton')).isPresent()).toBeTruthy();
  //   expect(element(by.css('#endButton')).isPresent()).toBeTruthy();
  // });

  // it('simple algorithm page displays code properly', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Simple')).click();
  //   expect(element(by.css('#line4')).getText()).toContain("this is now 5!");
  // });

  // // ----------------  gale-shapley e2e tests

  // it('can navigate to gale-shapley algorithm page using dropdown', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();
  // });

  // it('gale-shapley algorithm page displays playback tools properly', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();

  //   expect(element(by.css('#restartButton')).isPresent()).toBeTruthy();
  //   expect(element(by.css('#backButton')).isPresent()).toBeTruthy();
  //   expect(element(by.css('#playButton')).isPresent()).toBeTruthy();
  //   expect(element(by.css('#forwardButton')).isPresent()).toBeTruthy();
  //   expect(element(by.css('#endButton')).isPresent()).toBeTruthy();
  // });

  // it('gale-shapley algorithm page displays code properly', () => {
  //   page.navigateTo();
  //   element(by.id('algorithmDropdown')).click();
  //   element(by.cssContainingText('span', 'Gale-Shapley Stable Marriage')).click();

  //   expect(element(by.css('#line4')).getText()).toContain("if w is free then");
  // });

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
