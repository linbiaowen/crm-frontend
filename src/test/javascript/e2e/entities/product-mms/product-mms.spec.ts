import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductMmsComponentsPage, ProductMmsDeleteDialog, ProductMmsUpdatePage } from './product-mms.page-object';

const expect = chai.expect;

describe('ProductMms e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productMmsComponentsPage: ProductMmsComponentsPage;
  let productMmsUpdatePage: ProductMmsUpdatePage;
  let productMmsDeleteDialog: ProductMmsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductMms', async () => {
    await navBarPage.goToEntity('product-mms');
    productMmsComponentsPage = new ProductMmsComponentsPage();
    await browser.wait(ec.visibilityOf(productMmsComponentsPage.title), 5000);
    expect(await productMmsComponentsPage.getTitle()).to.eq('crmwebApp.productMms.home.title');
    await browser.wait(ec.or(ec.visibilityOf(productMmsComponentsPage.entities), ec.visibilityOf(productMmsComponentsPage.noResult)), 1000);
  });

  it('should load create ProductMms page', async () => {
    await productMmsComponentsPage.clickOnCreateButton();
    productMmsUpdatePage = new ProductMmsUpdatePage();
    expect(await productMmsUpdatePage.getPageTitle()).to.eq('crmwebApp.productMms.home.createOrEditLabel');
    await productMmsUpdatePage.cancel();
  });

  it('should create and save ProductMms', async () => {
    const nbButtonsBeforeCreate = await productMmsComponentsPage.countDeleteButtons();

    await productMmsComponentsPage.clickOnCreateButton();

    await promise.all([
      productMmsUpdatePage.setMmsIdInput('mmsId'),
      productMmsUpdatePage.setProductSpecIdInput('5'),
      productMmsUpdatePage.setUnitInput('unit'),
      productMmsUpdatePage.setVolumeInput('5'),
      productMmsUpdatePage.mmsTypeSelectLastOption(),
      productMmsUpdatePage.setMinTransferQuotaInput('5'),
      productMmsUpdatePage.setMaxTransferQuotaInput('5'),
      productMmsUpdatePage.setMinRetentionQuotaInput('5'),
      productMmsUpdatePage.setLockCountInput('5'),
      productMmsUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      productMmsUpdatePage.setCreatedByInput('createdBy'),
      productMmsUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      productMmsUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      productMmsUpdatePage.setTenantIdInput('tenantId')
    ]);

    expect(await productMmsUpdatePage.getMmsIdInput()).to.eq('mmsId', 'Expected MmsId value to be equals to mmsId');
    expect(await productMmsUpdatePage.getProductSpecIdInput()).to.eq('5', 'Expected productSpecId value to be equals to 5');
    expect(await productMmsUpdatePage.getUnitInput()).to.eq('unit', 'Expected Unit value to be equals to unit');
    expect(await productMmsUpdatePage.getVolumeInput()).to.eq('5', 'Expected volume value to be equals to 5');
    const selectedRoamingAllowed = productMmsUpdatePage.getRoamingAllowedInput();
    if (await selectedRoamingAllowed.isSelected()) {
      await productMmsUpdatePage.getRoamingAllowedInput().click();
      expect(await productMmsUpdatePage.getRoamingAllowedInput().isSelected(), 'Expected roamingAllowed not to be selected').to.be.false;
    } else {
      await productMmsUpdatePage.getRoamingAllowedInput().click();
      expect(await productMmsUpdatePage.getRoamingAllowedInput().isSelected(), 'Expected roamingAllowed to be selected').to.be.true;
    }
    expect(await productMmsUpdatePage.getMinTransferQuotaInput()).to.eq('5', 'Expected minTransferQuota value to be equals to 5');
    expect(await productMmsUpdatePage.getMaxTransferQuotaInput()).to.eq('5', 'Expected maxTransferQuota value to be equals to 5');
    expect(await productMmsUpdatePage.getMinRetentionQuotaInput()).to.eq('5', 'Expected minRetentionQuota value to be equals to 5');
    expect(await productMmsUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await productMmsUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await productMmsUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await productMmsUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await productMmsUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await productMmsUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await productMmsUpdatePage.save();
    expect(await productMmsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productMmsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProductMms', async () => {
    const nbButtonsBeforeDelete = await productMmsComponentsPage.countDeleteButtons();
    await productMmsComponentsPage.clickOnLastDeleteButton();

    productMmsDeleteDialog = new ProductMmsDeleteDialog();
    expect(await productMmsDeleteDialog.getDialogTitle()).to.eq('crmwebApp.productMms.delete.question');
    await productMmsDeleteDialog.clickOnConfirmButton();

    expect(await productMmsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
