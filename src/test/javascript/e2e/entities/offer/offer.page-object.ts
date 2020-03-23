import { element, by, ElementFinder } from 'protractor';

export class OfferComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-offer div table .btn-danger'));
  title = element.all(by.css('jhi-offer div h2#page-heading span')).first();
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

export class OfferUpdatePage {
  pageTitle = element(by.id('jhi-offer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  offerIdInput = element(by.id('field_offerId'));
  offerExternalIdInput = element(by.id('field_offerExternalId'));
  offerNameInput = element(by.id('field_offerName'));
  offerNameChiInput = element(by.id('field_offerNameChi'));
  offerTypeSelect = element(by.id('field_offerType'));
  offerPriceInput = element(by.id('field_offerPrice'));
  tempCustomerSegmentsInput = element(by.id('field_tempCustomerSegments'));
  tempCustomerClassesInput = element(by.id('field_tempCustomerClasses'));
  tempSalesChannelsInput = element(by.id('field_tempSalesChannels'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  tempChildOfferIdsInput = element(by.id('field_tempChildOfferIds'));
  tempProductIdsInput = element(by.id('field_tempProductIds'));
  tempAdvancePaymentIdsInput = element(by.id('field_tempAdvancePaymentIds'));
  tempPromoCodesInput = element(by.id('field_tempPromoCodes'));
  tempDiscountCodesInput = element(by.id('field_tempDiscountCodes'));
  limitedActivationPeriodInput = element(by.id('field_limitedActivationPeriod'));
  allowedActivationStartDateInput = element(by.id('field_allowedActivationStartDate'));
  allowedActivationEndDateInput = element(by.id('field_allowedActivationEndDate'));
  isGroupSharingOfferInput = element(by.id('field_isGroupSharingOffer'));
  isMnpOfferInput = element(by.id('field_isMnpOffer'));
  autoRenewalInput = element(by.id('field_autoRenewal'));
  transferAllowedInput = element(by.id('field_transferAllowed'));
  infoSharingAllowedInput = element(by.id('field_infoSharingAllowed'));
  infoSharingOptionsInput = element(by.id('field_infoSharingOptions'));
  offerPeriodInput = element(by.id('field_offerPeriod'));
  offerPeriodTermInput = element(by.id('field_offerPeriodTerm'));
  paymentTypeInput = element(by.id('field_paymentType'));
  priorityInput = element(by.id('field_priority'));
  lockCountInput = element(by.id('field_lockCount'));
  createdDateInput = element(by.id('field_createdDate'));
  createdByInput = element(by.id('field_createdBy'));
  lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
  lastUpdatedByInput = element(by.id('field_lastUpdatedBy'));
  tenantIdInput = element(by.id('field_tenantId'));

  parentOfferSelect = element(by.id('field_parentOffer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOfferIdInput(offerId: string): Promise<void> {
    await this.offerIdInput.sendKeys(offerId);
  }

  async getOfferIdInput(): Promise<string> {
    return await this.offerIdInput.getAttribute('value');
  }

  async setOfferExternalIdInput(offerExternalId: string): Promise<void> {
    await this.offerExternalIdInput.sendKeys(offerExternalId);
  }

  async getOfferExternalIdInput(): Promise<string> {
    return await this.offerExternalIdInput.getAttribute('value');
  }

  async setOfferNameInput(offerName: string): Promise<void> {
    await this.offerNameInput.sendKeys(offerName);
  }

  async getOfferNameInput(): Promise<string> {
    return await this.offerNameInput.getAttribute('value');
  }

  async setOfferNameChiInput(offerNameChi: string): Promise<void> {
    await this.offerNameChiInput.sendKeys(offerNameChi);
  }

  async getOfferNameChiInput(): Promise<string> {
    return await this.offerNameChiInput.getAttribute('value');
  }

  async setOfferTypeSelect(offerType: string): Promise<void> {
    await this.offerTypeSelect.sendKeys(offerType);
  }

  async getOfferTypeSelect(): Promise<string> {
    return await this.offerTypeSelect.element(by.css('option:checked')).getText();
  }

  async offerTypeSelectLastOption(): Promise<void> {
    await this.offerTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setOfferPriceInput(offerPrice: string): Promise<void> {
    await this.offerPriceInput.sendKeys(offerPrice);
  }

  async getOfferPriceInput(): Promise<string> {
    return await this.offerPriceInput.getAttribute('value');
  }

  async setTempCustomerSegmentsInput(tempCustomerSegments: string): Promise<void> {
    await this.tempCustomerSegmentsInput.sendKeys(tempCustomerSegments);
  }

  async getTempCustomerSegmentsInput(): Promise<string> {
    return await this.tempCustomerSegmentsInput.getAttribute('value');
  }

  async setTempCustomerClassesInput(tempCustomerClasses: string): Promise<void> {
    await this.tempCustomerClassesInput.sendKeys(tempCustomerClasses);
  }

  async getTempCustomerClassesInput(): Promise<string> {
    return await this.tempCustomerClassesInput.getAttribute('value');
  }

  async setTempSalesChannelsInput(tempSalesChannels: string): Promise<void> {
    await this.tempSalesChannelsInput.sendKeys(tempSalesChannels);
  }

  async getTempSalesChannelsInput(): Promise<string> {
    return await this.tempSalesChannelsInput.getAttribute('value');
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

  async setTempChildOfferIdsInput(tempChildOfferIds: string): Promise<void> {
    await this.tempChildOfferIdsInput.sendKeys(tempChildOfferIds);
  }

  async getTempChildOfferIdsInput(): Promise<string> {
    return await this.tempChildOfferIdsInput.getAttribute('value');
  }

  async setTempProductIdsInput(tempProductIds: string): Promise<void> {
    await this.tempProductIdsInput.sendKeys(tempProductIds);
  }

  async getTempProductIdsInput(): Promise<string> {
    return await this.tempProductIdsInput.getAttribute('value');
  }

  async setTempAdvancePaymentIdsInput(tempAdvancePaymentIds: string): Promise<void> {
    await this.tempAdvancePaymentIdsInput.sendKeys(tempAdvancePaymentIds);
  }

  async getTempAdvancePaymentIdsInput(): Promise<string> {
    return await this.tempAdvancePaymentIdsInput.getAttribute('value');
  }

  async setTempPromoCodesInput(tempPromoCodes: string): Promise<void> {
    await this.tempPromoCodesInput.sendKeys(tempPromoCodes);
  }

  async getTempPromoCodesInput(): Promise<string> {
    return await this.tempPromoCodesInput.getAttribute('value');
  }

  async setTempDiscountCodesInput(tempDiscountCodes: string): Promise<void> {
    await this.tempDiscountCodesInput.sendKeys(tempDiscountCodes);
  }

  async getTempDiscountCodesInput(): Promise<string> {
    return await this.tempDiscountCodesInput.getAttribute('value');
  }

  getLimitedActivationPeriodInput(): ElementFinder {
    return this.limitedActivationPeriodInput;
  }

  async setAllowedActivationStartDateInput(allowedActivationStartDate: string): Promise<void> {
    await this.allowedActivationStartDateInput.sendKeys(allowedActivationStartDate);
  }

  async getAllowedActivationStartDateInput(): Promise<string> {
    return await this.allowedActivationStartDateInput.getAttribute('value');
  }

  async setAllowedActivationEndDateInput(allowedActivationEndDate: string): Promise<void> {
    await this.allowedActivationEndDateInput.sendKeys(allowedActivationEndDate);
  }

  async getAllowedActivationEndDateInput(): Promise<string> {
    return await this.allowedActivationEndDateInput.getAttribute('value');
  }

  getIsGroupSharingOfferInput(): ElementFinder {
    return this.isGroupSharingOfferInput;
  }

  getIsMnpOfferInput(): ElementFinder {
    return this.isMnpOfferInput;
  }

  getAutoRenewalInput(): ElementFinder {
    return this.autoRenewalInput;
  }

  getTransferAllowedInput(): ElementFinder {
    return this.transferAllowedInput;
  }

  getInfoSharingAllowedInput(): ElementFinder {
    return this.infoSharingAllowedInput;
  }

  async setInfoSharingOptionsInput(infoSharingOptions: string): Promise<void> {
    await this.infoSharingOptionsInput.sendKeys(infoSharingOptions);
  }

  async getInfoSharingOptionsInput(): Promise<string> {
    return await this.infoSharingOptionsInput.getAttribute('value');
  }

  async setOfferPeriodInput(offerPeriod: string): Promise<void> {
    await this.offerPeriodInput.sendKeys(offerPeriod);
  }

  async getOfferPeriodInput(): Promise<string> {
    return await this.offerPeriodInput.getAttribute('value');
  }

  async setOfferPeriodTermInput(offerPeriodTerm: string): Promise<void> {
    await this.offerPeriodTermInput.sendKeys(offerPeriodTerm);
  }

  async getOfferPeriodTermInput(): Promise<string> {
    return await this.offerPeriodTermInput.getAttribute('value');
  }

  async setPaymentTypeInput(paymentType: string): Promise<void> {
    await this.paymentTypeInput.sendKeys(paymentType);
  }

  async getPaymentTypeInput(): Promise<string> {
    return await this.paymentTypeInput.getAttribute('value');
  }

  async setPriorityInput(priority: string): Promise<void> {
    await this.priorityInput.sendKeys(priority);
  }

  async getPriorityInput(): Promise<string> {
    return await this.priorityInput.getAttribute('value');
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

  async parentOfferSelectLastOption(): Promise<void> {
    await this.parentOfferSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentOfferSelectOption(option: string): Promise<void> {
    await this.parentOfferSelect.sendKeys(option);
  }

  getParentOfferSelect(): ElementFinder {
    return this.parentOfferSelect;
  }

  async getParentOfferSelectedOption(): Promise<string> {
    return await this.parentOfferSelect.element(by.css('option:checked')).getText();
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

export class OfferDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-offer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-offer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
