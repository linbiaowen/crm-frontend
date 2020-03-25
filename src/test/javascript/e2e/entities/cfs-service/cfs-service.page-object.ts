import { element, by, ElementFinder } from 'protractor';

export class CfsServiceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cfs-service div table .btn-danger'));
  title = element.all(by.css('jhi-cfs-service div h2#page-heading span')).first();
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

export class CfsServiceUpdatePage {
  pageTitle = element(by.id('jhi-cfs-service-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  serviceIdInput = element(by.id('field_serviceId'));
  serviceNameInput = element(by.id('field_serviceName'));
  tempVoiceSpecIdsInput = element(by.id('field_tempVoiceSpecIds'));
  tempDataSpecIdsInput = element(by.id('field_tempDataSpecIds'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  voiceServiceSpecSelect = element(by.id('field_voiceServiceSpec'));
  dataServiceSpecSelect = element(by.id('field_dataServiceSpec'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setServiceIdInput(serviceId: string): Promise<void> {
    await this.serviceIdInput.sendKeys(serviceId);
  }

  async getServiceIdInput(): Promise<string> {
    return await this.serviceIdInput.getAttribute('value');
  }

  async setServiceNameInput(serviceName: string): Promise<void> {
    await this.serviceNameInput.sendKeys(serviceName);
  }

  async getServiceNameInput(): Promise<string> {
    return await this.serviceNameInput.getAttribute('value');
  }

  async setTempVoiceSpecIdsInput(tempVoiceSpecIds: string): Promise<void> {
    await this.tempVoiceSpecIdsInput.sendKeys(tempVoiceSpecIds);
  }

  async getTempVoiceSpecIdsInput(): Promise<string> {
    return await this.tempVoiceSpecIdsInput.getAttribute('value');
  }

  async setTempDataSpecIdsInput(tempDataSpecIds: string): Promise<void> {
    await this.tempDataSpecIdsInput.sendKeys(tempDataSpecIds);
  }

  async getTempDataSpecIdsInput(): Promise<string> {
    return await this.tempDataSpecIdsInput.getAttribute('value');
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

  async voiceServiceSpecSelectLastOption(): Promise<void> {
    await this.voiceServiceSpecSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async voiceServiceSpecSelectOption(option: string): Promise<void> {
    await this.voiceServiceSpecSelect.sendKeys(option);
  }

  getVoiceServiceSpecSelect(): ElementFinder {
    return this.voiceServiceSpecSelect;
  }

  async getVoiceServiceSpecSelectedOption(): Promise<string> {
    return await this.voiceServiceSpecSelect.element(by.css('option:checked')).getText();
  }

  async dataServiceSpecSelectLastOption(): Promise<void> {
    await this.dataServiceSpecSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dataServiceSpecSelectOption(option: string): Promise<void> {
    await this.dataServiceSpecSelect.sendKeys(option);
  }

  getDataServiceSpecSelect(): ElementFinder {
    return this.dataServiceSpecSelect;
  }

  async getDataServiceSpecSelectedOption(): Promise<string> {
    return await this.dataServiceSpecSelect.element(by.css('option:checked')).getText();
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

export class CfsServiceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cfsService-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cfsService'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
