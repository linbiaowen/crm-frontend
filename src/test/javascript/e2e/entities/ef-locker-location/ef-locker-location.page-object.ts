import { element, by, ElementFinder } from 'protractor';

export class EfLockerLocationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ef-locker-location div table .btn-danger'));
  title = element.all(by.css('jhi-ef-locker-location div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EfLockerLocationUpdatePage {
  pageTitle = element(by.id('jhi-ef-locker-location-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  efLockerCodeInput = element(by.id('field_efLockerCode'));
  regionEngInput = element(by.id('field_regionEng'));
  areaEngInput = element(by.id('field_areaEng'));
  fullAddressEngInput = element(by.id('field_fullAddressEng'));
  regionChiInput = element(by.id('field_regionChi'));
  areaChiInput = element(by.id('field_areaChi'));
  fullAddressChiInput = element(by.id('field_fullAddressChi'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEfLockerCodeInput(efLockerCode: string): Promise<void> {
    await this.efLockerCodeInput.sendKeys(efLockerCode);
  }

  async getEfLockerCodeInput(): Promise<string> {
    return await this.efLockerCodeInput.getAttribute('value');
  }

  async setRegionEngInput(regionEng: string): Promise<void> {
    await this.regionEngInput.sendKeys(regionEng);
  }

  async getRegionEngInput(): Promise<string> {
    return await this.regionEngInput.getAttribute('value');
  }

  async setAreaEngInput(areaEng: string): Promise<void> {
    await this.areaEngInput.sendKeys(areaEng);
  }

  async getAreaEngInput(): Promise<string> {
    return await this.areaEngInput.getAttribute('value');
  }

  async setFullAddressEngInput(fullAddressEng: string): Promise<void> {
    await this.fullAddressEngInput.sendKeys(fullAddressEng);
  }

  async getFullAddressEngInput(): Promise<string> {
    return await this.fullAddressEngInput.getAttribute('value');
  }

  async setRegionChiInput(regionChi: string): Promise<void> {
    await this.regionChiInput.sendKeys(regionChi);
  }

  async getRegionChiInput(): Promise<string> {
    return await this.regionChiInput.getAttribute('value');
  }

  async setAreaChiInput(areaChi: string): Promise<void> {
    await this.areaChiInput.sendKeys(areaChi);
  }

  async getAreaChiInput(): Promise<string> {
    return await this.areaChiInput.getAttribute('value');
  }

  async setFullAddressChiInput(fullAddressChi: string): Promise<void> {
    await this.fullAddressChiInput.sendKeys(fullAddressChi);
  }

  async getFullAddressChiInput(): Promise<string> {
    return await this.fullAddressChiInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EfLockerLocationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-efLockerLocation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-efLockerLocation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
