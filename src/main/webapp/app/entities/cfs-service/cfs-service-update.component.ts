import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICfsService, CfsService } from 'app/shared/model/cfs-service.model';
import { CfsServiceService } from './cfs-service.service';
import { IVoiceServiceSpec } from 'app/shared/model/voice-service-spec.model';
import { VoiceServiceSpecService } from 'app/entities/voice-service-spec/voice-service-spec.service';
import { IDataServiceSpec } from 'app/shared/model/data-service-spec.model';
import { DataServiceSpecService } from 'app/entities/data-service-spec/data-service-spec.service';

type SelectableEntity = IVoiceServiceSpec | IDataServiceSpec;

@Component({
  selector: 'jhi-cfs-service-update',
  templateUrl: './cfs-service-update.component.html'
})
export class CfsServiceUpdateComponent implements OnInit {
  isSaving = false;
  voiceservicespecs: IVoiceServiceSpec[] = [];
  dataservicespecs: IDataServiceSpec[] = [];

  editForm = this.fb.group({
    id: [],
    serviceId: [null, [Validators.required]],
    serviceName: [null, [Validators.required]],
    tempVoiceSpecIds: [],
    tempDataSpecIds: [],
    lockCount: [],
    createdDate: [null, [Validators.required]],
    createdBy: [null, [Validators.required]],
    lastUpdatedDate: [null, [Validators.required]],
    lastUpdatedBy: [null, [Validators.required]],
    tenantId: [null, [Validators.required]],
    voiceServiceSpec: [],
    dataServiceSpec: []
  });

  constructor(
    protected cfsServiceService: CfsServiceService,
    protected voiceServiceSpecService: VoiceServiceSpecService,
    protected dataServiceSpecService: DataServiceSpecService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cfsService }) => {
      if (!cfsService.id) {
        const today = moment().startOf('day');
        cfsService.createdDate = today;
        cfsService.lastUpdatedDate = today;
      }

      this.updateForm(cfsService);

      this.voiceServiceSpecService
        .query({ filter: 'cfsservice-is-null' })
        .pipe(
          map((res: HttpResponse<IVoiceServiceSpec[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IVoiceServiceSpec[]) => {
          if (!cfsService.voiceServiceSpec || !cfsService.voiceServiceSpec.id) {
            this.voiceservicespecs = resBody;
          } else {
            this.voiceServiceSpecService
              .find(cfsService.voiceServiceSpec.id)
              .pipe(
                map((subRes: HttpResponse<IVoiceServiceSpec>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IVoiceServiceSpec[]) => (this.voiceservicespecs = concatRes));
          }
        });

      this.dataServiceSpecService
        .query({ filter: 'cfsservice-is-null' })
        .pipe(
          map((res: HttpResponse<IDataServiceSpec[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDataServiceSpec[]) => {
          if (!cfsService.dataServiceSpec || !cfsService.dataServiceSpec.id) {
            this.dataservicespecs = resBody;
          } else {
            this.dataServiceSpecService
              .find(cfsService.dataServiceSpec.id)
              .pipe(
                map((subRes: HttpResponse<IDataServiceSpec>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDataServiceSpec[]) => (this.dataservicespecs = concatRes));
          }
        });
    });
  }

  updateForm(cfsService: ICfsService): void {
    this.editForm.patchValue({
      id: cfsService.id,
      serviceId: cfsService.serviceId,
      serviceName: cfsService.serviceName,
      tempVoiceSpecIds: cfsService.tempVoiceSpecIds,
      tempDataSpecIds: cfsService.tempDataSpecIds,
      lockCount: cfsService.lockCount,
      createdDate: cfsService.createdDate ? cfsService.createdDate.format(DATE_TIME_FORMAT) : null,
      createdBy: cfsService.createdBy,
      lastUpdatedDate: cfsService.lastUpdatedDate ? cfsService.lastUpdatedDate.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: cfsService.lastUpdatedBy,
      tenantId: cfsService.tenantId,
      voiceServiceSpec: cfsService.voiceServiceSpec,
      dataServiceSpec: cfsService.dataServiceSpec
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cfsService = this.createFromForm();
    if (cfsService.id !== undefined) {
      this.subscribeToSaveResponse(this.cfsServiceService.update(cfsService));
    } else {
      this.subscribeToSaveResponse(this.cfsServiceService.create(cfsService));
    }
  }

  private createFromForm(): ICfsService {
    return {
      ...new CfsService(),
      id: this.editForm.get(['id'])!.value,
      serviceId: this.editForm.get(['serviceId'])!.value,
      serviceName: this.editForm.get(['serviceName'])!.value,
      tempVoiceSpecIds: this.editForm.get(['tempVoiceSpecIds'])!.value,
      tempDataSpecIds: this.editForm.get(['tempDataSpecIds'])!.value,
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
      voiceServiceSpec: this.editForm.get(['voiceServiceSpec'])!.value,
      dataServiceSpec: this.editForm.get(['dataServiceSpec'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICfsService>>): void {
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
