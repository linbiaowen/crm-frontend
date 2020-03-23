import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  OfferCustomerClassComponentsPage,
  OfferCustomerClassDeleteDialog,
  OfferCustomerClassUpdatePage
} from './offer-customer-class.page-object';

const expect = chai.expect;

describe('OfferCustomerClass e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let offerCustomerClassComponentsPage: OfferCustomerClassComponentsPage;
  let offerCustomerClassUpdatePage: OfferCustomerClassUpdatePage;
  let offerCustomerClassDeleteDialog: OfferCustomerClassDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OfferCustomerClasses', async () => {
    await navBarPage.goToEntity('offer-customer-class');
    offerCustomerClassComponentsPage = new OfferCustomerClassComponentsPage();
    await browser.wait(ec.visibilityOf(offerCustomerClassComponentsPage.title), 5000);
    expect(await offerCustomerClassComponentsPage.getTitle()).to.eq('crmwebApp.offerCustomerClass.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(offerCustomerClassComponentsPage.entities), ec.visibilityOf(offerCustomerClassComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OfferCustomerClass page', async () => {
    await offerCustomerClassComponentsPage.clickOnCreateButton();
    offerCustomerClassUpdatePage = new OfferCustomerClassUpdatePage();
    expect(await offerCustomerClassUpdatePage.getPageTitle()).to.eq('crmwebApp.offerCustomerClass.home.createOrEditLabel');
    await offerCustomerClassUpdatePage.cancel();
  });

  it('should create and save OfferCustomerClasses', async () => {
    const nbButtonsBeforeCreate = await offerCustomerClassComponentsPage.countDeleteButtons();

    await offerCustomerClassComponentsPage.clickOnCreateButton();

    await promise.all([
      offerCustomerClassUpdatePage.setCustomerClassInput('customerClass'),
      offerCustomerClassUpdatePage.offerSelectLastOption()
    ]);

    expect(await offerCustomerClassUpdatePage.getCustomerClassInput()).to.eq(
      'customerClass',
      'Expected CustomerClass value to be equals to customerClass'
    );

    await offerCustomerClassUpdatePage.save();
    expect(await offerCustomerClassUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await offerCustomerClassComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last OfferCustomerClass', async () => {
    const nbButtonsBeforeDelete = await offerCustomerClassComponentsPage.countDeleteButtons();
    await offerCustomerClassComponentsPage.clickOnLastDeleteButton();

    offerCustomerClassDeleteDialog = new OfferCustomerClassDeleteDialog();
    expect(await offerCustomerClassDeleteDialog.getDialogTitle()).to.eq('crmwebApp.offerCustomerClass.delete.question');
    await offerCustomerClassDeleteDialog.clickOnConfirmButton();

    expect(await offerCustomerClassComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
