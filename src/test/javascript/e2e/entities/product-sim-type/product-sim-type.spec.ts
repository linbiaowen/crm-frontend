import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductSimTypeComponentsPage, ProductSimTypeDeleteDialog, ProductSimTypeUpdatePage } from './product-sim-type.page-object';

const expect = chai.expect;

describe('ProductSimType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productSimTypeComponentsPage: ProductSimTypeComponentsPage;
  let productSimTypeUpdatePage: ProductSimTypeUpdatePage;
  let productSimTypeDeleteDialog: ProductSimTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductSimTypes', async () => {
    await navBarPage.goToEntity('product-sim-type');
    productSimTypeComponentsPage = new ProductSimTypeComponentsPage();
    await browser.wait(ec.visibilityOf(productSimTypeComponentsPage.title), 5000);
    expect(await productSimTypeComponentsPage.getTitle()).to.eq('crmwebApp.productSimType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(productSimTypeComponentsPage.entities), ec.visibilityOf(productSimTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProductSimType page', async () => {
    await productSimTypeComponentsPage.clickOnCreateButton();
    productSimTypeUpdatePage = new ProductSimTypeUpdatePage();
    expect(await productSimTypeUpdatePage.getPageTitle()).to.eq('crmwebApp.productSimType.home.createOrEditLabel');
    await productSimTypeUpdatePage.cancel();
  });

  it('should create and save ProductSimTypes', async () => {
    const nbButtonsBeforeCreate = await productSimTypeComponentsPage.countDeleteButtons();

    await productSimTypeComponentsPage.clickOnCreateButton();

    await promise.all([
      productSimTypeUpdatePage.simTypeSelectLastOption(),
      productSimTypeUpdatePage.setImsiRangeFromInput('imsiRangeFrom'),
      productSimTypeUpdatePage.setImsiRangeToInput('imsiRangeTo'),
      productSimTypeUpdatePage.setSimRepositoryRefInput('simRepositoryRef'),
      productSimTypeUpdatePage.setLockCountInput('5'),
      productSimTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      productSimTypeUpdatePage.setCreatedByInput('createdBy'),
      productSimTypeUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      productSimTypeUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      productSimTypeUpdatePage.setTenantIdInput('tenantId')
    ]);

    expect(await productSimTypeUpdatePage.getImsiRangeFromInput()).to.eq(
      'imsiRangeFrom',
      'Expected ImsiRangeFrom value to be equals to imsiRangeFrom'
    );
    expect(await productSimTypeUpdatePage.getImsiRangeToInput()).to.eq(
      'imsiRangeTo',
      'Expected ImsiRangeTo value to be equals to imsiRangeTo'
    );
    expect(await productSimTypeUpdatePage.getSimRepositoryRefInput()).to.eq(
      'simRepositoryRef',
      'Expected SimRepositoryRef value to be equals to simRepositoryRef'
    );
    expect(await productSimTypeUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await productSimTypeUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await productSimTypeUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await productSimTypeUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await productSimTypeUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await productSimTypeUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await productSimTypeUpdatePage.save();
    expect(await productSimTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productSimTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProductSimType', async () => {
    const nbButtonsBeforeDelete = await productSimTypeComponentsPage.countDeleteButtons();
    await productSimTypeComponentsPage.clickOnLastDeleteButton();

    productSimTypeDeleteDialog = new ProductSimTypeDeleteDialog();
    expect(await productSimTypeDeleteDialog.getDialogTitle()).to.eq('crmwebApp.productSimType.delete.question');
    await productSimTypeDeleteDialog.clickOnConfirmButton();

    expect(await productSimTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
