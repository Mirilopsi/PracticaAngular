import { PracticaBasePage } from './app.po';

describe('practica-base App', () => {
  let page: PracticaBasePage;

  beforeEach(() => {
    page = new PracticaBasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
