import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CfsServiceComponentsPage, CfsServiceDeleteDialog, CfsServiceUpdatePage } from './cfs-service.page-object';

const expect = chai.expect;

describe('CfsService e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cfsServiceComponentsPage: CfsServiceComponentsPage;
  let cfsServiceUpdatePage: CfsServiceUpdatePage;
  let cfsServiceDeleteDialog: CfsServiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CfsServices', async () => {
    await navBarPage.goToEntity('cfs-service');
    cfsServiceComponentsPage = new CfsServiceComponentsPage();
    await browser.wait(ec.visibilityOf(cfsServiceComponentsPage.title), 5000);
    expect(await cfsServiceComponentsPage.getTitle()).to.eq('crmwebApp.cfsService.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cfsServiceComponentsPage.entities), ec.visibilityOf(cfsServiceComponentsPage.noResult)), 1000);
  });

  it('should load create CfsService page', async () => {
    await cfsServiceComponentsPage.clickOnCreateButton();
    cfsServiceUpdatePage = new CfsServiceUpdatePage();
    expect(await cfsServiceUpdatePage.getPageTitle()).to.eq('crmwebApp.cfsService.home.createOrEditLabel');
    await cfsServiceUpdatePage.cancel();
  });

  it('should create and save CfsServices', async () => {
    const nbButtonsBeforeCreate = await cfsServiceComponentsPage.countDeleteButtons();

    await cfsServiceComponentsPage.clickOnCreateButton();

    await promise.all([
      cfsServiceUpdatePage.setServiceIdInput('serviceId'),
      cfsServiceUpdatePage.setServiceNameInput('serviceName'),
      cfsServiceUpdatePage.setTempVoiceSpecIdsInput('tempVoiceSpecIds'),
      cfsServiceUpdatePage.setTempDataSpecIdsInput('tempDataSpecIds'),
      cfsServiceUpdatePage.setLockCountInput('5'),
      cfsServiceUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      cfsServiceUpdatePage.setCreatedByInput('createdBy'),
      cfsServiceUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      cfsServiceUpdatePage.setLastUpdatedByInput('lastUpdatedBy'),
      cfsServiceUpdatePage.setTenantIdInput('tenantId'),
      cfsServiceUpdatePage.voiceServiceSpecSelectLastOption(),
      cfsServiceUpdatePage.dataServiceSpecSelectLastOption()
    ]);

    expect(await cfsServiceUpdatePage.getServiceIdInput()).to.eq('serviceId', 'Expected ServiceId value to be equals to serviceId');
    expect(await cfsServiceUpdatePage.getServiceNameInput()).to.eq('serviceName', 'Expected ServiceName value to be equals to serviceName');
    expect(await cfsServiceUpdatePage.getTempVoiceSpecIdsInput()).to.eq(
      'tempVoiceSpecIds',
      'Expected TempVoiceSpecIds value to be equals to tempVoiceSpecIds'
    );
    expect(await cfsServiceUpdatePage.getTempDataSpecIdsInput()).to.eq(
      'tempDataSpecIds',
      'Expected TempDataSpecIds value to be equals to tempDataSpecIds'
    );
    expect(await cfsServiceUpdatePage.getLockCountInput()).to.eq('5', 'Expected lockCount value to be equals to 5');
    expect(await cfsServiceUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await cfsServiceUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await cfsServiceUpdatePage.getLastUpdatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastUpdatedDate value to be equals to 2000-12-31'
    );
    expect(await cfsServiceUpdatePage.getLastUpdatedByInput()).to.eq(
      'lastUpdatedBy',
      'Expected LastUpdatedBy value to be equals to lastUpdatedBy'
    );
    expect(await cfsServiceUpdatePage.getTenantIdInput()).to.eq('tenantId', 'Expected TenantId value to be equals to tenantId');

    await cfsServiceUpdatePage.save();
    expect(await cfsServiceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cfsServiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CfsService', async () => {
    const nbButtonsBeforeDelete = await cfsServiceComponentsPage.countDeleteButtons();
    await cfsServiceComponentsPage.clickOnLastDeleteButton();

    cfsServiceDeleteDialog = new CfsServiceDeleteDialog();
    expect(await cfsServiceDeleteDialog.getDialogTitle()).to.eq('crmwebApp.cfsService.delete.question');
    await cfsServiceDeleteDialog.clickOnConfirmButton();

    expect(await cfsServiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
