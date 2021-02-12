import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.title-text')).getText() as Promise<string>;
  }

  getLogoAlg(): Promise<string> {
    return element(by.css('#alg')).getText() as Promise<string>;
  }

  getLogoMatch(): Promise<string> {
    return element(by.css('#match')).getText() as Promise<string>;
  }

}
