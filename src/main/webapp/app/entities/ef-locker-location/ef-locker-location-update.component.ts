import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEfLockerLocation, EfLockerLocation } from 'app/shared/model/ef-locker-location.model';
import { EfLockerLocationService } from './ef-locker-location.service';

@Component({
  selector: 'jhi-ef-locker-location-update',
  templateUrl: './ef-locker-location-update.component.html'
})
export class EfLockerLocationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    efLockerCode: [null, [Validators.required]],
    regionEng: [],
    areaEng: [],
    fullAddressEng: [],
    regionChi: [],
    areaChi: [],
    fullAddressChi: []
  });

  constructor(
    protected efLockerLocationService: EfLockerLocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ efLockerLocation }) => {
      this.updateForm(efLockerLocation);
    });
  }

  updateForm(efLockerLocation: IEfLockerLocation): void {
    this.editForm.patchValue({
      id: efLockerLocation.id,
      efLockerCode: efLockerLocation.efLockerCode,
      regionEng: efLockerLocation.regionEng,
      areaEng: efLockerLocation.areaEng,
      fullAddressEng: efLockerLocation.fullAddressEng,
      regionChi: efLockerLocation.regionChi,
      areaChi: efLockerLocation.areaChi,
      fullAddressChi: efLockerLocation.fullAddressChi
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const efLockerLocation = this.createFromForm();
    if (efLockerLocation.id !== undefined) {
      this.subscribeToSaveResponse(this.efLockerLocationService.update(efLockerLocation));
    } else {
      this.subscribeToSaveResponse(this.efLockerLocationService.create(efLockerLocation));
    }
  }

  private createFromForm(): IEfLockerLocation {
    return {
      ...new EfLockerLocation(),
      id: this.editForm.get(['id'])!.value,
      efLockerCode: this.editForm.get(['efLockerCode'])!.value,
      regionEng: this.editForm.get(['regionEng'])!.value,
      areaEng: this.editForm.get(['areaEng'])!.value,
      fullAddressEng: this.editForm.get(['fullAddressEng'])!.value,
      regionChi: this.editForm.get(['regionChi'])!.value,
      areaChi: this.editForm.get(['areaChi'])!.value,
      fullAddressChi: this.editForm.get(['fullAddressChi'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEfLockerLocation>>): void {
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
}
