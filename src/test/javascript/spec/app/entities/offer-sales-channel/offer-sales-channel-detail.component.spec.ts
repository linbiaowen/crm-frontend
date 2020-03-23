import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { OfferSalesChannelDetailComponent } from 'app/entities/offer-sales-channel/offer-sales-channel-detail.component';
import { OfferSalesChannel } from 'app/shared/model/offer-sales-channel.model';

describe('Component Tests', () => {
  describe('OfferSalesChannel Management Detail Component', () => {
    let comp: OfferSalesChannelDetailComponent;
    let fixture: ComponentFixture<OfferSalesChannelDetailComponent>;
    const route = ({ data: of({ offerSalesChannel: new OfferSalesChannel('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [OfferSalesChannelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfferSalesChannelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferSalesChannelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load offerSalesChannel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offerSalesChannel).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
