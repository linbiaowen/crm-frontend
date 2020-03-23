import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  OfferCustomerSegmentComponentsPage,
  OfferCustomerSegmentDeleteDialog,
  OfferCustomerSegmentUpdatePage
} from './offer-customer-segment.page-object';

const expect = chai.expect;

describe('OfferCustomerSegment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let offerCustomerSegmentComponentsPage: OfferCustomerSegmentComponentsPage;
  let offerCustomerSegmentUpdatePage: OfferCustomerSegmentUpdatePage;
  let offerCustomerSegmentDeleteDialog: OfferCustomerSegmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OfferCustomerSegments', async () => {
    await navBarPage.goToEntity('offer-customer-segment');
    offerCustomerSegmentComponentsPage = new OfferCustomerSegmentComponentsPage();
    await browser.wait(ec.visibilityOf(offerCustomerSegmentComponentsPage.title), 5000);
    expect(await offerCustomerSegmentComponentsPage.getTitle()).to.eq('crmwebApp.offerCustomerSegment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(offerCustomerSegmentComponentsPage.entities), ec.visibilityOf(offerCustomerSegmentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create OfferCustomerSegment page', async () => {
    await offerCustomerSegmentComponentsPage.clickOnCreateButton();
    offerCustomerSegmentUpdatePage = new OfferCustomerSegmentUpdatePage();
    expect(await offerCustomerSegmentUpdatePage.getPageTitle()).to.eq('crmwebApp.offerCustomerSegment.home.createOrEditLabel');
    await offerCustomerSegmentUpdatePage.cancel();
  });

  it('should create and save OfferCustomerSegments', async () => {
    const nbButtonsBeforeCreate = await offerCustomerSegmentComponentsPage.countDeleteButtons();

    await offerCustomerSegmentComponentsPage.clickOnCreateButton();

    await promise.all([
      offerCustomerSegmentUpdatePage.setCustomerSegmentInput('customerSegment'),
      offerCustomerSegmentUpdatePage.offerSelectLastOption()
    ]);

    expect(await offerCustomerSegmentUpdatePage.getCustomerSegmentInput()).to.eq(
      'customerSegment',
      'Expected CustomerSegment value to be equals to customerSegment'
    );

    await offerCustomerSegmentUpdatePage.save();
    expect(await offerCustomerSegmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await offerCustomerSegmentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last OfferCustomerSegment', async () => {
    const nbButtonsBeforeDelete = await offerCustomerSegmentComponentsPage.countDeleteButtons();
    await offerCustomerSegmentComponentsPage.clickOnLastDeleteButton();

    offerCustomerSegmentDeleteDialog = new OfferCustomerSegmentDeleteDialog();
    expect(await offerCustomerSegmentDeleteDialog.getDialogTitle()).to.eq('crmwebApp.offerCustomerSegment.delete.question');
    await offerCustomerSegmentDeleteDialog.clickOnConfirmButton();

    expect(await offerCustomerSegmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
