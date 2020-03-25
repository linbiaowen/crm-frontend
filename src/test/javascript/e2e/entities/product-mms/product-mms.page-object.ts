import { element, by, ElementFinder } from 'protractor';

export class ProductMmsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-mms div table .btn-danger'));
  title = element.all(by.css('jhi-product-mms div h2#page-heading span')).first();
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

export class ProductMmsUpdatePage {
  pageTitle = element(by.id('jhi-product-mms-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  mmsIdInput = element(by.id('field_mmsId'));
  productIdInput = element(by.id('field_productId'));
  unitInput = element(by.id('field_unit'));
  volumeInput = element(by.id('field_volume'));
  mmsTypeSelect = element(by.id('field_mmsType'));
  roamingAllowedInput = element(by.id('field_roamingAllowed'));
  minTransferQuotaInput = element(by.id('field_minTransferQuota'));
  maxTransferQuotaInput = element(by.id('field_maxTransferQuota'));
  minRetentionQuotaInput = element(by.id('field_minRetentionQuota'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMmsIdInput(mmsId: string): Promise<void> {
    await this.mmsIdInput.sendKeys(mmsId);
  }

  async getMmsIdInput(): Promise<string> {
    return await this.mmsIdInput.getAttribute('value');
  }

  async setProductIdInput(productId: string): Promise<void> {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput(): Promise<string> {
    return await this.productIdInput.getAttribute('value');
  }

  async setUnitInput(unit: string): Promise<void> {
    await this.unitInput.sendKeys(unit);
  }

  async getUnitInput(): Promise<string> {
    return await this.unitInput.getAttribute('value');
  }

  async setVolumeInput(volume: string): Promise<void> {
    await this.volumeInput.sendKeys(volume);
  }

  async getVolumeInput(): Promise<string> {
    return await this.volumeInput.getAttribute('value');
  }

  async setMmsTypeSelect(mmsType: string): Promise<void> {
    await this.mmsTypeSelect.sendKeys(mmsType);
  }

  async getMmsTypeSelect(): Promise<string> {
    return await this.mmsTypeSelect.element(by.css('option:checked')).getText();
  }

  async mmsTypeSelectLastOption(): Promise<void> {
    await this.mmsTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  getRoamingAllowedInput(): ElementFinder {
    return this.roamingAllowedInput;
  }

  async setMinTransferQuotaInput(minTransferQuota: string): Promise<void> {
    await this.minTransferQuotaInput.sendKeys(minTransferQuota);
  }

  async getMinTransferQuotaInput(): Promise<string> {
    return await this.minTransferQuotaInput.getAttribute('value');
  }

  async setMaxTransferQuotaInput(maxTransferQuota: string): Promise<void> {
    await this.maxTransferQuotaInput.sendKeys(maxTransferQuota);
  }

  async getMaxTransferQuotaInput(): Promise<string> {
    return await this.maxTransferQuotaInput.getAttribute('value');
  }

  async setMinRetentionQuotaInput(minRetentionQuota: string): Promise<void> {
    await this.minRetentionQuotaInput.sendKeys(minRetentionQuota);
  }

  async getMinRetentionQuotaInput(): Promise<string> {
    return await this.minRetentionQuotaInput.getAttribute('value');
  }

  async setLockCountInput(lockCount: string): Promise<void> {
    await this.lockCountInput.sendKeys(lockCount);
  }

  async getLockCountInput(): Promise<string> {
    return await this.lockCountInput.getAttribute('value');
  }

  async setCreatedDateInput(createdDate: string): Promise<void> {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput(): Promise<string> {
    return await this.createdDateInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy: string): Promise<void> {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput(): Promise<string> {
    return await this.createdByInput.getAttribute('value');
  }

  async setLastUpdatedDateInput(lastUpdatedDate: string): Promise<void> {
    await this.lastUpdatedDateInput.sendKeys(lastUpdatedDate);
  }

  async getLastUpdatedDateInput(): Promise<string> {
    return await this.lastUpdatedDateInput.getAttribute('value');
  }

  async setLastUpdatedByInput(lastUpdatedBy: string): Promise<void> {
    await this.lastUpdatedByInput.sendKeys(lastUpdatedBy);
  }

  async getLastUpdatedByInput(): Promise<string> {
    return await this.lastUpdatedByInput.getAttribute('value');
  }

  async setTenantIdInput(tenantId: string): Promise<void> {
    await this.tenantIdInput.sendKeys(tenantId);
  }

  async getTenantIdInput(): Promise<string> {
    return await this.tenantIdInput.getAttribute('value');
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

export class ProductMmsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productMms-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productMms'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
