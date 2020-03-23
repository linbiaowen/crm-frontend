import { element, by, ElementFinder } from 'protractor';

export class CustDocDataStoreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cust-doc-data-store div table .btn-danger'));
  title = element.all(by.css('jhi-cust-doc-data-store div h2#page-heading span')).first();
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

export class CustDocDataStoreUpdatePage {
  pageTitle = element(by.id('jhi-cust-doc-data-store-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  docDataStoreIdInput = element(by.id('field_docDataStoreId'));
  documentDataInput = element(by.id('file_documentData'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDocDataStoreIdInput(docDataStoreId: string): Promise<void> {
    await this.docDataStoreIdInput.sendKeys(docDataStoreId);
  }

  async getDocDataStoreIdInput(): Promise<string> {
    return await this.docDataStoreIdInput.getAttribute('value');
  }

  async setDocumentDataInput(documentData: string): Promise<void> {
    await this.documentDataInput.sendKeys(documentData);
  }

  async getDocumentDataInput(): Promise<string> {
    return await this.documentDataInput.getAttribute('value');
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

export class CustDocDataStoreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-custDocDataStore-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-custDocDataStore'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
