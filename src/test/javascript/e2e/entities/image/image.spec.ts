import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImageComponentsPage, ImageDeleteDialog, ImageUpdatePage } from './image.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Image e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageComponentsPage: ImageComponentsPage;
  let imageUpdatePage: ImageUpdatePage;
  let imageDeleteDialog: ImageDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Images', async () => {
    await navBarPage.goToEntity('image');
    imageComponentsPage = new ImageComponentsPage();
    await browser.wait(ec.visibilityOf(imageComponentsPage.title), 5000);
    expect(await imageComponentsPage.getTitle()).to.eq('crmwebApp.image.home.title');
    await browser.wait(ec.or(ec.visibilityOf(imageComponentsPage.entities), ec.visibilityOf(imageComponentsPage.noResult)), 1000);
  });

  it('should load create Image page', async () => {
    await imageComponentsPage.clickOnCreateButton();
    imageUpdatePage = new ImageUpdatePage();
    expect(await imageUpdatePage.getPageTitle()).to.eq('crmwebApp.image.home.createOrEditLabel');
    await imageUpdatePage.cancel();
  });

  it('should create and save Images', async () => {
    const nbButtonsBeforeCreate = await imageComponentsPage.countDeleteButtons();

    await imageComponentsPage.clickOnCreateButton();

    await promise.all([
      imageUpdatePage.setImageIdInput('5'),
      imageUpdatePage.imageTypeSelectLastOption(),
      imageUpdatePage.setDisplaySeqInput('5'),
      imageUpdatePage.setImageInput(absolutePath),
      imageUpdatePage.setRemarkInput('remark'),
      imageUpdatePage.setLockCountInput('5'),
      imageUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      imageUpdatePage.setCreatedByInput('createdBy'),
      imageUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      imageUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      imageUpdatePage.setTenantIdInput('tenantId'),
      imageUpdatePage.offerSelectLastOption(),
      imageUpdatePage.productSelectLastOption()
    ]);

    expect(await imageUpdatePage.getImageIdInput()).to.eq('5', 'Expected imageId value to be equals to 5');
    expect(await imageUpdatePage.getDisplaySeqInput()).to.eq('5', 'Expected displaySeq value to be equals to 5');
    expect(await imageUpdatePage.getImageInput()).to.endsWith(fileNameToUpload, 'Expected Image value to be end with ' + fileNameToUpload);
    expect(await imageUpdatePage.getRemarkInput()).to.eq('remark', 'Expected Remark value to be equals to remark');
    expect(await imageUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await imageUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await imageUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await imageUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await imageUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await imageUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await imageUpdatePage.save();
    expect(await imageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Image', async () => {
    const nbButtonsBeforeDelete = await imageComponentsPage.countDeleteButtons();
    await imageComponentsPage.clickOnLastDeleteButton();

    imageDeleteDialog = new ImageDeleteDialog();
    expect(await imageDeleteDialog.getDialogTitle()).to.eq('crmwebApp.image.delete.question');
    await imageDeleteDialog.clickOnConfirmButton();

    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
