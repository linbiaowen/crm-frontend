import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustContact, CustContact } from 'app/shared/model/cust-contact.model';
import { CustContactService } from './cust-contact.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { ICustSubscription } from 'app/shared/model/cust-subscription.model';
import { CustSubscriptionService } from 'app/entities/cust-subscription/cust-subscription.service';

type SelectableEntity = ICustomer | ICustSubscription;

@Component({
  selector: 'jhi-cust-contact-update',
  templateUrl: './cust-contact-update.component.html'
})
export class CustContactUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];
  custsubscriptions: ICustSubscription[] = [];

  editForm = this.fb.group({
    id: [],
    contactId: [null, [Validators.required]],
    accountId: [null, [Validators.required]],
    accountType: [null, [Validators.required]],
    contactType: [null, [Validators.required]],
    contactPerson: [],
    contactPhone: [],
    contactEmail: [],
    status: [null, [Validators.required]],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    customer: [],
    custSubscription: []
  });

  constructor(
    protected custContactService: CustContactService,
    protected customerService: CustomerService,
    protected custSubscriptionService: CustSubscriptionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ custContact }) => {
      if (!custContact.id) {
        const today = moment().startOf('day');
        custContact.createdDate = today;
        custContact.lastUpdatedDate = today;
      }

      this.updateForm(custContact);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.custSubscriptionService.query().subscribe((res: HttpResponse<ICustSubscription[]>) => (this.custsubscriptions = res.body || []));
    });
  }

  updateForm(custContact: ICustContact): void {
    this.editForm.patchValue({
      id: custContact.id,
      contactId: custContact.contactId,
      accountId: custContact.accountId,
      accountType: custContact.accountType,
      contactType: custContact.contactType,
      contactPerson: custContact.contactPerson,
      contactPhone: custContact.contactPhone,
      contactEmail: custContact.contactEmail,
      status: custContact.status,
      lockCount: custContact.lockCount,
      createdDate: custContact.createdDate ? custContact.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: custContact.createdBy,
      lastUpdatedDate: custContact.lastUpdatedDate ? custContact.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: custContact.lastUpdatedBy,
      tenantId: custContact.tenantId,
      customer: custContact.customer,
      custSubscription: custContact.custSubscription
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const custContact = this.createFromForm();
    if (custContact.id !== undefined) {
      this.subscribeToSaveResponse(this.custContactService.update(custContact));
    } else {
      this.subscribeToSaveResponse(this.custContactService.create(custContact));
    }
  }

  private createFromForm(): ICustContact {
    return {
      ...new CustContact(),
      id: this.editForm.get(['id'])!.value,
      contactId: this.editForm.get(['contactId'])!.value,
      accountId: this.editForm.get(['accountId'])!.value,
      accountType: this.editForm.get(['accountType'])!.value,
      contactType: this.editForm.get(['contactType'])!.value,
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      contactPhone: this.editForm.get(['contactPhone'])!.value,
      contactEmail: this.editForm.get(['contactEmail'])!.value,
      status: this.editForm.get(['status'])!.value,
      lockCount: this.editForm.get(['lockCount'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdBy: this.editForm.get(['createdBy'])!.value,
      lastUpdatedDate: this.editForm.get(['lastUpdatedDate'])!.value
        ? moment(this.editForm.get(['lastUpdatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy'])!.value,
      tenantId: this.editForm.get(['tenantId'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      custSubscription: this.editForm.get(['custSubscription'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustContact>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
