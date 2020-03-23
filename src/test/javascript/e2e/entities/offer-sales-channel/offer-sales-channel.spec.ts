import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  OfferSalesChannelComponentsPage,
  OfferSalesChannelDeleteDialog,
  OfferSalesChannelUpdatePage
} from './offer-sales-channel.page-object';

const expect = chai.expect;

describe('OfferSalesChannel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let offerSalesChannelComponentsPage: OfferSalesChannelComponentsPage;
  let offerSalesChannelUpdatePage: OfferSalesChannelUpdatePage;
  let offerSalesChannelDeleteDialog: OfferSalesChannelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OfferSalesChannels', async () => {
    await navBarPage.goToEntity('offer-sales-channel');
    offerSalesChannelComponentsPage = new OfferSalesChannelComponentsPage();
    await browser.wait(ec.visibilityOf(offerSalesChannelComponentsPage.title), 5000);
    expect(await offerSalesChannelComponentsPage.getTitle()).to.eq('crmwebApp.offerSalesChannel.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(offerSalesChannelComponentsPage.entities), ec.visibilityOf(offerSalesChannelComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OfferSalesChannel page', async () => {
    await offerSalesChannelComponentsPage.clickOnCreateButton();
    offerSalesChannelUpdatePage = new OfferSalesChannelUpdatePage();
    expect(await offerSalesChannelUpdatePage.getPageTitle()).to.eq('crmwebApp.offerSalesChannel.home.createOrEditLabel');
    await offerSalesChannelUpdatePage.cancel();
  });

  it('should create and save OfferSalesChannels', async () => {
    const nbButtonsBeforeCreate = await offerSalesChannelComponentsPage.countDeleteButtons();

    await offerSalesChannelComponentsPage.clickOnCreateButton();

    await promise.all([
      offerSalesChannelUpdatePage.setSalesChannelInput('salesChannel'),
      offerSalesChannelUpdatePage.offerSelectLastOption()
    ]);

    expect(await offerSalesChannelUpdatePage.getSalesChannelInput()).to.eq(
      'salesChannel',
      'Expected SalesChannel value to be equals to salesChannel'
    );

    await offerSalesChannelUpdatePage.save();
    expect(await offerSalesChannelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await offerSalesChannelComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last OfferSalesChannel', async () => {
    const nbButtonsBeforeDelete = await offerSalesChannelComponentsPage.countDeleteButtons();
    await offerSalesChannelComponentsPage.clickOnLastDeleteButton();

    offerSalesChannelDeleteDialog = new OfferSalesChannelDeleteDialog();
    expect(await offerSalesChannelDeleteDialog.getDialogTitle()).to.eq('crmwebApp.offerSalesChannel.delete.question');
    await offerSalesChannelDeleteDialog.clickOnConfirmButton();

    expect(await offerSalesChannelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
