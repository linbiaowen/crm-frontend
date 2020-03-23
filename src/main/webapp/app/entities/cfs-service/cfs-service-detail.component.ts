import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICfsService } from 'app/shared/model/cfs-service.model';

@Component({
  selector: 'jhi-cfs-service-detail',
  templateUrl: './cfs-service-detail.component.html'
})
export class CfsServiceDetailComponent implements OnInit {
  cfsService: ICfsService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cfsService }) => (this.cfsService = cfsService));
  }

  previousState(): void {
    window.history.back();
  }
}
