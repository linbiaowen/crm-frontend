import { element, by, ElementFinder } from 'protractor';

export class SubsItemDeliveryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subs-item-delivery div table .btn-danger'));
  title = element.all(by.css('jhi-subs-item-delivery div h2#page-heading span')).first();
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

export class SubsItemDeliveryUpdatePage {
  pageTitle = element(by.id('jhi-subs-item-delivery-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  deliveryIdInput = element(by.id('field_deliveryId'));
  deliveryStatusInput = element(by.id('field_deliveryStatus'));
  deliveryOptionSelect = element(by.id('field_deliveryOption'));
  tempEfLockerCodeInput = element(by.id('field_tempEfLockerCode'));
  tempAddressIdInput = element(by.id('field_tempAddressId'));
  deliveryRefCodeInput = element(by.id('field_deliveryRefCode'));
  fileGenerationDateInput = element(by.id('field_fileGenerationDate'));
  fileReceivedDateInput = element(by.id('field_fileReceivedDate'));
  deliveryDateInput = element(by.id('field_deliveryDate'));
  remarksInput = element(by.id('field_remarks'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  efLockerLocationSelect = element(by.id('field_efLockerLocation'));
  custAddressSelect = element(by.id('field_custAddress'));
  subscriptionProductSelect = element(by.id('field_subscriptionProduct'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDeliveryIdInput(deliveryId: string): Promise<void> {
    await this.deliveryIdInput.sendKeys(deliveryId);
  }

  async getDeliveryIdInput(): Promise<string> {
    return await this.deliveryIdInput.getAttribute('value');
  }

  async setDeliveryStatusInput(deliveryStatus: string): Promise<void> {
    await this.deliveryStatusInput.sendKeys(deliveryStatus);
  }

  async getDeliveryStatusInput(): Promise<string> {
    return await this.deliveryStatusInput.getAttribute('value');
  }

  async setDeliveryOptionSelect(deliveryOption: string): Promise<void> {
    await this.deliveryOptionSelect.sendKeys(deliveryOption);
  }

  async getDeliveryOptionSelect(): Promise<string> {
    return await this.deliveryOptionSelect.element(by.css('option:checked')).getText();
  }

  async deliveryOptionSelectLastOption(): Promise<void> {
    await this.deliveryOptionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setTempEfLockerCodeInput(tempEfLockerCode: string): Promise<void> {
    await this.tempEfLockerCodeInput.sendKeys(tempEfLockerCode);
  }

  async getTempEfLockerCodeInput(): Promise<string> {
    return await this.tempEfLockerCodeInput.getAttribute('value');
  }

  async setTempAddressIdInput(tempAddressId: string): Promise<void> {
    await this.tempAddressIdInput.sendKeys(tempAddressId);
  }

  async getTempAddressIdInput(): Promise<string> {
    return await this.tempAddressIdInput.getAttribute('value');
  }

  async setDeliveryRefCodeInput(deliveryRefCode: string): Promise<void> {
    await this.deliveryRefCodeInput.sendKeys(deliveryRefCode);
  }

  async getDeliveryRefCodeInput(): Promise<string> {
    return await this.deliveryRefCodeInput.getAttribute('value');
  }

  async setFileGenerationDateInput(fileGenerationDate: string): Promise<void> {
    await this.fileGenerationDateInput.sendKeys(fileGenerationDate);
  }

  async getFileGenerationDateInput(): Promise<string> {
    return await this.fileGenerationDateInput.getAttribute('value');
  }

  async setFileReceivedDateInput(fileReceivedDate: string): Promise<void> {
    await this.fileReceivedDateInput.sendKeys(fileReceivedDate);
  }

  async getFileReceivedDateInput(): Promise<string> {
    return await this.fileReceivedDateInput.getAttribute('value');
  }

  async setDeliveryDateInput(deliveryDate: string): Promise<void> {
    await this.deliveryDateInput.sendKeys(deliveryDate);
  }

  async getDeliveryDateInput(): Promise<string> {
    return await this.deliveryDateInput.getAttribute('value');
  }

  async setRemarksInput(remarks: string): Promise<void> {
    await this.remarksInput.sendKeys(remarks);
  }

  async getRemarksInput(): Promise<string> {
    return await this.remarksInput.getAttribute('value');
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

  async efLockerLocationSelectLastOption(): Promise<void> {
    await this.efLockerLocationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async efLockerLocationSelectOption(option: string): Promise<void> {
    await this.efLockerLocationSelect.sendKeys(option);
  }

  getEfLockerLocationSelect(): ElementFinder {
    return this.efLockerLocationSelect;
  }

  async getEfLockerLocationSelectedOption(): Promise<string> {
    return await this.efLockerLocationSelect.element(by.css('option:checked')).getText();
  }

  async custAddressSelectLastOption(): Promise<void> {
    await this.custAddressSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async custAddressSelectOption(option: string): Promise<void> {
    await this.custAddressSelect.sendKeys(option);
  }

  getCustAddressSelect(): ElementFinder {
    return this.custAddressSelect;
  }

  async getCustAddressSelectedOption(): Promise<string> {
    return await this.custAddressSelect.element(by.css('option:checked')).getText();
  }

  async subscriptionProductSelectLastOption(): Promise<void> {
    await this.subscriptionProductSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subscriptionProductSelectOption(option: string): Promise<void> {
    await this.subscriptionProductSelect.sendKeys(option);
  }

  getSubscriptionProductSelect(): ElementFinder {
    return this.subscriptionProductSelect;
  }

  async getSubscriptionProductSelectedOption(): Promise<string> {
    return await this.subscriptionProductSelect.element(by.css('option:checked')).getText();
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

export class SubsItemDeliveryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-subsItemDelivery-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-subsItemDelivery'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
