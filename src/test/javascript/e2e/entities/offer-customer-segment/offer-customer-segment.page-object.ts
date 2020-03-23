import { element, by, ElementFinder } from 'protractor';

export class OfferCustomerSegmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-offer-customer-segment div table .btn-danger'));
  title = element.all(by.css('jhi-offer-customer-segment div h2#page-heading span')).first();
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

export class OfferCustomerSegmentUpdatePage {
  pageTitle = element(by.id('jhi-offer-customer-segment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  customerSegmentInput = element(by.id('field_customerSegment'));

  offerSelect = element(by.id('field_offer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCustomerSegmentInput(customerSegment: string): Promise<void> {
    await this.customerSegmentInput.sendKeys(customerSegment);
  }

  async getCustomerSegmentInput(): Promise<string> {
    return await this.customerSegmentInput.getAttribute('value');
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

export class OfferCustomerSegmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-offerCustomerSegment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-offerCustomerSegment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
