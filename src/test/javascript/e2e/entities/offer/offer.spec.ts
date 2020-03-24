import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OfferComponentsPage, OfferDeleteDialog, OfferUpdatePage } from './offer.page-object';

const expect = chai.expect;

describe('Offer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let offerComponentsPage: OfferComponentsPage;
  let offerUpdatePage: OfferUpdatePage;
  let offerDeleteDialog: OfferDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Offers', async () => {
    await navBarPage.goToEntity('offer');
    offerComponentsPage = new OfferComponentsPage();
    await browser.wait(ec.visibilityOf(offerComponentsPage.title), 5000);
    expect(await offerComponentsPage.getTitle()).to.eq('crmwebApp.offer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(offerComponentsPage.entities), ec.visibilityOf(offerComponentsPage.noResult)), 1000);
  });

  it('should load create Offer page', async () => {
    await offerComponentsPage.clickOnCreateButton();
    offerUpdatePage = new OfferUpdatePage();
    expect(await offerUpdatePage.getPageTitle()).to.eq('crmwebApp.offer.home.createOrEditLabel');
    await offerUpdatePage.cancel();
  });

  it('should create and save Offers', async () => {
    const nbButtonsBeforeCreate = await offerComponentsPage.countDeleteButtons();

    await offerComponentsPage.clickOnCreateButton();

    await promise.all([
      offerUpdatePage.setOfferIdInput('offerId'),
      offerUpdatePage.setOfferExternalIdInput('offerExternalId'),
      offerUpdatePage.setOfferNameInput('offerName'),
      offerUpdatePage.setOfferNameChiInput('offerNameChi'),
      offerUpdatePage.setOfferDescInput('offerDesc'),
      offerUpdatePage.setOfferDescChiInput('offerDescChi'),
      offerUpdatePage.offerTypeSelectLastOption(),
      offerUpdatePage.setOfferPriceInput('5'),
      offerUpdatePage.setTempCustomerSegmentsInput('tempCustomerSegments'),
      offerUpdatePage.setTempCustomerClassesInput('tempCustomerClasses'),
      offerUpdatePage.setTempSalesChannelsInput('tempSalesChannels'),
      offerUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setTempChildOfferIdsInput('tempChildOfferIds'),
      offerUpdatePage.setTempProductIdsInput('tempProductIds'),
      offerUpdatePage.setTempAdvancePaymentIdsInput('tempAdvancePaymentIds'),
      offerUpdatePage.setTempPromoCodesInput('tempPromoCodes'),
      offerUpdatePage.setTempDiscountCodesInput('tempDiscountCodes'),
      offerUpdatePage.setTempImageIdsInput('tempImageIds'),
      offerUpdatePage.setAllowedActivationStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setAllowedActivationEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setInfoSharingOptionsInput('infoSharingOptions'),
      offerUpdatePage.setOfferPeriodInput('5'),
      offerUpdatePage.setOfferPeriodTermInput('offerPeriodTerm'),
      offerUpdatePage.setPaymentTypeInput('paymentType'),
      offerUpdatePage.setPriorityInput('5'),
      offerUpdatePage.setLockCountInput('5'),
      offerUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setCreatedByInput('createdBy'),
      offerUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      offerUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      offerUpdatePage.setTenantIdInput('tenantId')
      // offerUpdatePage.parentOfferSelectLastOption(),
    ]);

    expect(await offerUpdatePage.getOfferIdInput()).to.eq('offerId', 'Expected OfferId value to be equals to offerId');
    expect(await offerUpdatePage.getOfferExternalIdInput()).to.eq(
      'offerExternalId',
      'Expected OfferExternalId value to be equals to offerExternalId'
    );
    expect(await offerUpdatePage.getOfferNameInput()).to.eq('offerName', 'Expected OfferName value to be equals to offerName');
    expect(await offerUpdatePage.getOfferNameChiInput()).to.eq('offerNameChi', 'Expected OfferNameChi value to be equals to offerNameChi');
    expect(await offerUpdatePage.getOfferDescInput()).to.eq('offerDesc', 'Expected OfferDesc value to be equals to offerDesc');
    expect(await offerUpdatePage.getOfferDescChiInput()).to.eq('offerDescChi', 'Expected OfferDescChi value to be equals to offerDescChi');
    expect(await offerUpdatePage.getOfferPriceInput()).to.eq('5', 'Expected offerPrice value to be equals to 5');
    expect(await offerUpdatePage.getTempCustomerSegmentsInput()).to.eq(
      'tempCustomerSegments',
      'Expected TempCustomerSegments value to be equals to tempCustomerSegments'
    );
    expect(await offerUpdatePage.getTempCustomerClassesInput()).to.eq(
      'tempCustomerClasses',
      'Expected TempCustomerClasses value to be equals to tempCustomerClasses'
    );
    expect(await offerUpdatePage.getTempSalesChannelsInput()).to.eq(
      'tempSalesChannels',
      'Expected TempSalesChannels value to be equals to tempSalesChannels'
    );
    expect(await offerUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30', 'Expected startDate value to be equals to 2000-12-31');
    expect(await offerUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
    expect(await offerUpdatePage.getTempChildOfferIdsInput()).to.eq(
      'tempChildOfferIds',
      'Expected TempChildOfferIds value to be equals to tempChildOfferIds'
    );
    expect(await offerUpdatePage.getTempProductIdsInput()).to.eq(
      'tempProductIds',
      'Expected TempProductIds value to be equals to tempProductIds'
    );
    expect(await offerUpdatePage.getTempAdvancePaymentIdsInput()).to.eq(
      'tempAdvancePaymentIds',
      'Expected TempAdvancePaymentIds value to be equals to tempAdvancePaymentIds'
    );
    expect(await offerUpdatePage.getTempPromoCodesInput()).to.eq(
      'tempPromoCodes',
      'Expected TempPromoCodes value to be equals to tempPromoCodes'
    );
    expect(await offerUpdatePage.getTempDiscountCodesInput()).to.eq(
      'tempDiscountCodes',
      'Expected TempDiscountCodes value to be equals to tempDiscountCodes'
    );
    expect(await offerUpdatePage.getTempImageIdsInput()).to.eq('tempImageIds', 'Expected TempImageIds value to be equals to tempImageIds');
    const selectedLimitedActivationPeriod = offerUpdatePage.getLimitedActivationPeriodInput();
    if (await selectedLimitedActivationPeriod.isSelected()) {
      await offerUpdatePage.getLimitedActivationPeriodInput().click();
      expect(await offerUpdatePage.getLimitedActivationPeriodInput().isSelected(), 'Expected limitedActivationPeriod not to be selected').to
        .be.false;
    } else {
      await offerUpdatePage.getLimitedActivationPeriodInput().click();
      expect(await offerUpdatePage.getLimitedActivationPeriodInput().isSelected(), 'Expected limitedActivationPeriod to be selected').to.be
        .true;
    }
    expect(await offerUpdatePage.getAllowedActivationStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected allowedActivationStartDate value to be equals to 2000-12-31'
    );
    expect(await offerUpdatePage.getAllowedActivationEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected allowedActivationEndDate value to be equals to 2000-12-31'
    );
    const selectedIsGroupSharingOffer = offerUpdatePage.getIsGroupSharingOfferInput();
    if (await selectedIsGroupSharingOffer.isSelected()) {
      await offerUpdatePage.getIsGroupSharingOfferInput().click();
      expect(await offerUpdatePage.getIsGroupSharingOfferInput().isSelected(), 'Expected isGroupSharingOffer not to be selected').to.be
        .false;
    } else {
      await offerUpdatePage.getIsGroupSharingOfferInput().click();
      expect(await offerUpdatePage.getIsGroupSharingOfferInput().isSelected(), 'Expected isGroupSharingOffer to be selected').to.be.true;
    }
    const selectedIsMnpOffer = offerUpdatePage.getIsMnpOfferInput();
    if (await selectedIsMnpOffer.isSelected()) {
      await offerUpdatePage.getIsMnpOfferInput().click();
      expect(await offerUpdatePage.getIsMnpOfferInput().isSelected(), 'Expected isMnpOffer not to be selected').to.be.false;
    } else {
      await offerUpdatePage.getIsMnpOfferInput().click();
      expect(await offerUpdatePage.getIsMnpOfferInput().isSelected(), 'Expected isMnpOffer to be selected').to.be.true;
    }
    const selectedAutoRenewal = offerUpdatePage.getAutoRenewalInput();
    if (await selectedAutoRenewal.isSelected()) {
      await offerUpdatePage.getAutoRenewalInput().click();
      expect(await offerUpdatePage.getAutoRenewalInput().isSelected(), 'Expected autoRenewal not to be selected').to.be.false;
    } else {
      await offerUpdatePage.getAutoRenewalInput().click();
      expect(await offerUpdatePage.getAutoRenewalInput().isSelected(), 'Expected autoRenewal to be selected').to.be.true;
    }
    const selectedTransferAllowed = offerUpdatePage.getTransferAllowedInput();
    if (await selectedTransferAllowed.isSelected()) {
      await offerUpdatePage.getTransferAllowedInput().click();
      expect(await offerUpdatePage.getTransferAllowedInput().isSelected(), 'Expected transferAllowed not to be selected').to.be.false;
    } else {
      await offerUpdatePage.getTransferAllowedInput().click();
      expect(await offerUpdatePage.getTransferAllowedInput().isSelected(), 'Expected transferAllowed to be selected').to.be.true;
    }
    const selectedInfoSharingAllowed = offerUpdatePage.getInfoSharingAllowedInput();
    if (await selectedInfoSharingAllowed.isSelected()) {
      await offerUpdatePage.getInfoSharingAllowedInput().click();
      expect(await offerUpdatePage.getInfoSharingAllowedInput().isSelected(), 'Expected infoSharingAllowed not to be selected').to.be.false;
    } else {
      await offerUpdatePage.getInfoSharingAllowedInput().click();
      expect(await offerUpdatePage.getInfoSharingAllowedInput().isSelected(), 'Expected infoSharingAllowed to be selected').to.be.true;
    }
    expect(await offerUpdatePage.getInfoSharingOptionsInput()).to.eq(
      'infoSharingOptions',
      'Expected InfoSharingOptions value to be equals to infoSharingOptions'
    );
    expect(await offerUpdatePage.getOfferPeriodInput()).to.eq('5', 'Expected offerPeriod value to be equals to 5');
    expect(await offerUpdatePage.getOfferPeriodTermInput()).to.eq(
      'offerPeriodTerm',
      'Expected OfferPeriodTerm value to be equals to offerPeriodTerm'
    );
    expect(await offerUpdatePage.getPaymentTypeInput()).to.eq('paymentType', 'Expected PaymentType value to be equals to paymentType');
    expect(await offerUpdatePage.getPriorityInput()).to.eq('5', 'Expected priority value to be equals to 5');
    expect(await offerUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await offerUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await offerUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await offerUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await offerUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await offerUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await offerUpdatePage.save();
    expect(await offerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await offerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Offer', async () => {
    const nbButtonsBeforeDelete = await offerComponentsPage.countDeleteButtons();
    await offerComponentsPage.clickOnLastDeleteButton();

    offerDeleteDialog = new OfferDeleteDialog();
    expect(await offerDeleteDialog.getDialogTitle()).to.eq('crmwebApp.offer.delete.question');
    await offerDeleteDialog.clickOnConfirmButton();

    expect(await offerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
