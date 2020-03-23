import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();
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

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  productIdInput = element(by.id('field_productId'));
  productNameInput = element(by.id('field_productName'));
  productNameChiInput = element(by.id('field_productNameChi'));
  productDescInput = element(by.id('field_productDesc'));
  productDescChiInput = element(by.id('field_productDescChi'));
  productCateSelect = element(by.id('field_productCate'));
  productNatureSelect = element(by.id('field_productNature'));
  productFamilySelect = element(by.id('field_productFamily'));
  productTypeSelect = element(by.id('field_productType'));
  modelCodeInput = element(by.id('field_modelCode'));
  tempServiceIdInput = element(by.id('field_tempServiceId'));
  tempResourceSpecIdsInput = element(by.id('field_tempResourceSpecIds'));
  productSpecTypeSelect = element(by.id('field_productSpecType'));
  skuTypeSelect = element(by.id('field_skuType'));
  simTypeSelect = element(by.id('field_simType'));
  boxTypeSelect = element(by.id('field_boxType'));
  shippableInput = element(by.id('field_shippable'));
  tempDeliveryOptionsInput = element(by.id('field_tempDeliveryOptions'));
  tempVoiceIdsInput = element(by.id('field_tempVoiceIds'));
  tempDataIdsInput = element(by.id('field_tempDataIds'));
  tempSmsIdsInput = element(by.id('field_tempSmsIds'));
  tempMmsIdsInput = element(by.id('field_tempMmsIds'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  independentlyOrderableInput = element(by.id('field_independentlyOrderable'));
  networkProvisionRequiredInput = element(by.id('field_networkProvisionRequired'));
  changeEntitlementAllowedInput = element(by.id('field_changeEntitlementAllowed'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  productVoiceSelect = element(by.id('field_productVoice'));
  productDataSelect = element(by.id('field_productData'));
  productSmsSelect = element(by.id('field_productSms'));
  productMmsSelect = element(by.id('field_productMms'));
  cfsServiceSelect = element(by.id('field_cfsService'));
  offerSelect = element(by.id('field_offer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProductIdInput(productId: string): Promise<void> {
    await this.productIdInput.sendKeys(productId);
  }

  async getProductIdInput(): Promise<string> {
    return await this.productIdInput.getAttribute('value');
  }

  async setProductNameInput(productName: string): Promise<void> {
    await this.productNameInput.sendKeys(productName);
  }

  async getProductNameInput(): Promise<string> {
    return await this.productNameInput.getAttribute('value');
  }

  async setProductNameChiInput(productNameChi: string): Promise<void> {
    await this.productNameChiInput.sendKeys(productNameChi);
  }

  async getProductNameChiInput(): Promise<string> {
    return await this.productNameChiInput.getAttribute('value');
  }

  async setProductDescInput(productDesc: string): Promise<void> {
    await this.productDescInput.sendKeys(productDesc);
  }

  async getProductDescInput(): Promise<string> {
    return await this.productDescInput.getAttribute('value');
  }

  async setProductDescChiInput(productDescChi: string): Promise<void> {
    await this.productDescChiInput.sendKeys(productDescChi);
  }

  async getProductDescChiInput(): Promise<string> {
    return await this.productDescChiInput.getAttribute('value');
  }

  async setProductCateSelect(productCate: string): Promise<void> {
    await this.productCateSelect.sendKeys(productCate);
  }

  async getProductCateSelect(): Promise<string> {
    return await this.productCateSelect.element(by.css('option:checked')).getText();
  }

  async productCateSelectLastOption(): Promise<void> {
    await this.productCateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setProductNatureSelect(productNature: string): Promise<void> {
    await this.productNatureSelect.sendKeys(productNature);
  }

  async getProductNatureSelect(): Promise<string> {
    return await this.productNatureSelect.element(by.css('option:checked')).getText();
  }

  async productNatureSelectLastOption(): Promise<void> {
    await this.productNatureSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setProductFamilySelect(productFamily: string): Promise<void> {
    await this.productFamilySelect.sendKeys(productFamily);
  }

  async getProductFamilySelect(): Promise<string> {
    return await this.productFamilySelect.element(by.css('option:checked')).getText();
  }

  async productFamilySelectLastOption(): Promise<void> {
    await this.productFamilySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setProductTypeSelect(productType: string): Promise<void> {
    await this.productTypeSelect.sendKeys(productType);
  }

  async getProductTypeSelect(): Promise<string> {
    return await this.productTypeSelect.element(by.css('option:checked')).getText();
  }

  async productTypeSelectLastOption(): Promise<void> {
    await this.productTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setModelCodeInput(modelCode: string): Promise<void> {
    await this.modelCodeInput.sendKeys(modelCode);
  }

  async getModelCodeInput(): Promise<string> {
    return await this.modelCodeInput.getAttribute('value');
  }

  async setTempServiceIdInput(tempServiceId: string): Promise<void> {
    await this.tempServiceIdInput.sendKeys(tempServiceId);
  }

  async getTempServiceIdInput(): Promise<string> {
    return await this.tempServiceIdInput.getAttribute('value');
  }

  async setTempResourceSpecIdsInput(tempResourceSpecIds: string): Promise<void> {
    await this.tempResourceSpecIdsInput.sendKeys(tempResourceSpecIds);
  }

  async getTempResourceSpecIdsInput(): Promise<string> {
    return await this.tempResourceSpecIdsInput.getAttribute('value');
  }

  async setProductSpecTypeSelect(productSpecType: string): Promise<void> {
    await this.productSpecTypeSelect.sendKeys(productSpecType);
  }

  async getProductSpecTypeSelect(): Promise<string> {
    return await this.productSpecTypeSelect.element(by.css('option:checked')).getText();
  }

  async productSpecTypeSelectLastOption(): Promise<void> {
    await this.productSpecTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setSkuTypeSelect(skuType: string): Promise<void> {
    await this.skuTypeSelect.sendKeys(skuType);
  }

  async getSkuTypeSelect(): Promise<string> {
    return await this.skuTypeSelect.element(by.css('option:checked')).getText();
  }

  async skuTypeSelectLastOption(): Promise<void> {
    await this.skuTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setSimTypeSelect(simType: string): Promise<void> {
    await this.simTypeSelect.sendKeys(simType);
  }

  async getSimTypeSelect(): Promise<string> {
    return await this.simTypeSelect.element(by.css('option:checked')).getText();
  }

  async simTypeSelectLastOption(): Promise<void> {
    await this.simTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setBoxTypeSelect(boxType: string): Promise<void> {
    await this.boxTypeSelect.sendKeys(boxType);
  }

  async getBoxTypeSelect(): Promise<string> {
    return await this.boxTypeSelect.element(by.css('option:checked')).getText();
  }

  async boxTypeSelectLastOption(): Promise<void> {
    await this.boxTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  getShippableInput(): ElementFinder {
    return this.shippableInput;
  }

  async setTempDeliveryOptionsInput(tempDeliveryOptions: string): Promise<void> {
    await this.tempDeliveryOptionsInput.sendKeys(tempDeliveryOptions);
  }

  async getTempDeliveryOptionsInput(): Promise<string> {
    return await this.tempDeliveryOptionsInput.getAttribute('value');
  }

  async setTempVoiceIdsInput(tempVoiceIds: string): Promise<void> {
    await this.tempVoiceIdsInput.sendKeys(tempVoiceIds);
  }

  async getTempVoiceIdsInput(): Promise<string> {
    return await this.tempVoiceIdsInput.getAttribute('value');
  }

  async setTempDataIdsInput(tempDataIds: string): Promise<void> {
    await this.tempDataIdsInput.sendKeys(tempDataIds);
  }

  async getTempDataIdsInput(): Promise<string> {
    return await this.tempDataIdsInput.getAttribute('value');
  }

  async setTempSmsIdsInput(tempSmsIds: string): Promise<void> {
    await this.tempSmsIdsInput.sendKeys(tempSmsIds);
  }

  async getTempSmsIdsInput(): Promise<string> {
    return await this.tempSmsIdsInput.getAttribute('value');
  }

  async setTempMmsIdsInput(tempMmsIds: string): Promise<void> {
    await this.tempMmsIdsInput.sendKeys(tempMmsIds);
  }

  async getTempMmsIdsInput(): Promise<string> {
    return await this.tempMmsIdsInput.getAttribute('value');
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  getIndependentlyOrderableInput(): ElementFinder {
    return this.independentlyOrderableInput;
  }

  getNetworkProvisionRequiredInput(): ElementFinder {
    return this.networkProvisionRequiredInput;
  }

  getChangeEntitlementAllowedInput(): ElementFinder {
    return this.changeEntitlementAllowedInput;
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

  async productVoiceSelectLastOption(): Promise<void> {
    await this.productVoiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productVoiceSelectOption(option: string): Promise<void> {
    await this.productVoiceSelect.sendKeys(option);
  }

  getProductVoiceSelect(): ElementFinder {
    return this.productVoiceSelect;
  }

  async getProductVoiceSelectedOption(): Promise<string> {
    return await this.productVoiceSelect.element(by.css('option:checked')).getText();
  }

  async productDataSelectLastOption(): Promise<void> {
    await this.productDataSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productDataSelectOption(option: string): Promise<void> {
    await this.productDataSelect.sendKeys(option);
  }

  getProductDataSelect(): ElementFinder {
    return this.productDataSelect;
  }

  async getProductDataSelectedOption(): Promise<string> {
    return await this.productDataSelect.element(by.css('option:checked')).getText();
  }

  async productSmsSelectLastOption(): Promise<void> {
    await this.productSmsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSmsSelectOption(option: string): Promise<void> {
    await this.productSmsSelect.sendKeys(option);
  }

  getProductSmsSelect(): ElementFinder {
    return this.productSmsSelect;
  }

  async getProductSmsSelectedOption(): Promise<string> {
    return await this.productSmsSelect.element(by.css('option:checked')).getText();
  }

  async productMmsSelectLastOption(): Promise<void> {
    await this.productMmsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productMmsSelectOption(option: string): Promise<void> {
    await this.productMmsSelect.sendKeys(option);
  }

  getProductMmsSelect(): ElementFinder {
    return this.productMmsSelect;
  }

  async getProductMmsSelectedOption(): Promise<string> {
    return await this.productMmsSelect.element(by.css('option:checked')).getText();
  }

  async cfsServiceSelectLastOption(): Promise<void> {
    await this.cfsServiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cfsServiceSelectOption(option: string): Promise<void> {
    await this.cfsServiceSelect.sendKeys(option);
  }

  getCfsServiceSelect(): ElementFinder {
    return this.cfsServiceSelect;
  }

  async getCfsServiceSelectedOption(): Promise<string> {
    return await this.cfsServiceSelect.element(by.css('option:checked')).getText();
  }

  async offerSelectLastOption(): Promise<void> {
    await this.offerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async offerSelectOption(option: string): Promise<void> {
    await this.offerSelect.sendKeys(option);
  }

  getOfferSelect(): ElementFinder {
    return this.offerSelect;
  }

  async getOfferSelectedOption(): Promise<string> {
    return await this.offerSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
