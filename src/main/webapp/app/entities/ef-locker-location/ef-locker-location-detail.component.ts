import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEfLockerLocation } from 'app/shared/model/ef-locker-location.model';

@Component({
  selector: 'jhi-ef-locker-location-detail',
  templateUrl: './ef-locker-location-detail.component.html'
})
export class EfLockerLocationDetailComponent implements OnInit {
  efLockerLocation: IEfLockerLocation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ efLockerLocation }) => (this.efLockerLocation = efLockerLocation));
  }

  previousState(): void {
    window.history.back();
  }
}
