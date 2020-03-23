import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { ProductMmsDetailComponent } from 'app/entities/product-mms/product-mms-detail.component';
import { ProductMms } from 'app/shared/model/product-mms.model';

describe('Component Tests', () => {
  describe('ProductMms Management Detail Component', () => {
    let comp: ProductMmsDetailComponent;
    let fixture: ComponentFixture<ProductMmsDetailComponent>;
    const route = ({ data: of({ productMms: new ProductMms('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [ProductMmsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductMmsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductMmsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productMms on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productMms).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
