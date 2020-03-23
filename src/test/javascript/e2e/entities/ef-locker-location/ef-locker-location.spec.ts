import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EfLockerLocationComponentsPage, EfLockerLocationDeleteDialog, EfLockerLocationUpdatePage } from './ef-locker-location.page-object';

const expect = chai.expect;

describe('EfLockerLocation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let efLockerLocationComponentsPage: EfLockerLocationComponentsPage;
  let efLockerLocationUpdatePage: EfLockerLocationUpdatePage;
  let efLockerLocationDeleteDialog: EfLockerLocationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EfLockerLocations', async () => {
    await navBarPage.goToEntity('ef-locker-location');
    efLockerLocationComponentsPage = new EfLockerLocationComponentsPage();
    await browser.wait(ec.visibilityOf(efLockerLocationComponentsPage.title), 5000);
    expect(await efLockerLocationComponentsPage.getTitle()).to.eq('crmwebApp.efLockerLocation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(efLockerLocationComponentsPage.entities), ec.visibilityOf(efLockerLocationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create EfLockerLocation page', async () => {
    await efLockerLocationComponentsPage.clickOnCreateButton();
    efLockerLocationUpdatePage = new EfLockerLocationUpdatePage();
    expect(await efLockerLocationUpdatePage.getPageTitle()).to.eq('crmwebApp.efLockerLocation.home.createOrEditLabel');
    await efLockerLocationUpdatePage.cancel();
  });

  it('should create and save EfLockerLocations', async () => {
    const nbButtonsBeforeCreate = await efLockerLocationComponentsPage.countDeleteButtons();

    await efLockerLocationComponentsPage.clickOnCreateButton();

    await promise.all([
      efLockerLocationUpdatePage.setEfLockerCodeInput('efLockerCode'),
      efLockerLocationUpdatePage.setRegionEngInput('regionEng'),
      efLockerLocationUpdatePage.setAreaEngInput('areaEng'),
      efLockerLocationUpdatePage.setFullAddressEngInput('fullAddressEng'),
      efLockerLocationUpdatePage.setRegionChiInput('regionChi'),
      efLockerLocationUpdatePage.setAreaChiInput('areaChi'),
      efLockerLocationUpdatePage.setFullAddressChiInput('fullAddressChi')
    ]);

    expect(await efLockerLocationUpdatePage.getEfLockerCodeInput()).to.eq(
      'efLockerCode',
      'Expected EfLockerCode value to be equals to efLockerCode'
    );
    expect(await efLockerLocationUpdatePage.getRegionEngInput()).to.eq('regionEng', 'Expected RegionEng value to be equals to regionEng');
    expect(await efLockerLocationUpdatePage.getAreaEngInput()).to.eq('areaEng', 'Expected AreaEng value to be equals to areaEng');
    expect(await efLockerLocationUpdatePage.getFullAddressEngInput()).to.eq(
      'fullAddressEng',
      'Expected FullAddressEng value to be equals to fullAddressEng'
    );
    expect(await efLockerLocationUpdatePage.getRegionChiInput()).to.eq('regionChi', 'Expected RegionChi value to be equals to regionChi');
    expect(await efLockerLocationUpdatePage.getAreaChiInput()).to.eq('areaChi', 'Expected AreaChi value to be equals to areaChi');
    expect(await efLockerLocationUpdatePage.getFullAddressChiInput()).to.eq(
      'fullAddressChi',
      'Expected FullAddressChi value to be equals to fullAddressChi'
    );

    await efLockerLocationUpdatePage.save();
    expect(await efLockerLocationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await efLockerLocationComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EfLockerLocation', async () => {
    const nbButtonsBeforeDelete = await efLockerLocationComponentsPage.countDeleteButtons();
    await efLockerLocationComponentsPage.clickOnLastDeleteButton();

    efLockerLocationDeleteDialog = new EfLockerLocationDeleteDialog();
    expect(await efLockerLocationDeleteDialog.getDialogTitle()).to.eq('crmwebApp.efLockerLocation.delete.question');
    await efLockerLocationDeleteDialog.clickOnConfirmButton();

    expect(await efLockerLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
