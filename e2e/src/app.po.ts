import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  // ---------------------------------- HOME PAGE

  getTitleText(): Promise<string> {
    return element(by.css('.title-text')).getText() as Promise<string>;
  }

  getLogoAlg(): Promise<string> {
    return element(by.css('#alg')).getText() as Promise<string>;
  }

  getLogoMatch(): Promise<string> {
    return element(by.css('#match')).getText() as Promise<string>;
  }

  getHomePageRow1Text(): Promise<string> {
    return element(by.css('#homePageRow1Text')).getText() as Promise<string>;
  }

  getHomePageRow2Text(): Promise<string> {
    return element(by.css('#homePageRow2Text')).getText() as Promise<string>;
  }

  getHomePageRow3Text(): Promise<string> {
    return element(by.css('#homePageRow3Text')).getText() as Promise<string>;
  }

  getFeedbackBannerText(): Promise<string> {
    return element(by.css('#feedbackBanner')).getText() as Promise<string>;
  }

}
