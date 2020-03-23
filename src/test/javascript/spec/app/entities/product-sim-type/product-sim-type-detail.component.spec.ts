import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmwebTestModule } from '../../../test.module';
import { ProductSimTypeDetailComponent } from 'app/entities/product-sim-type/product-sim-type-detail.component';
import { ProductSimType } from 'app/shared/model/product-sim-type.model';

describe('Component Tests', () => {
  describe('ProductSimType Management Detail Component', () => {
    let comp: ProductSimTypeDetailComponent;
    let fixture: ComponentFixture<ProductSimTypeDetailComponent>;
    const route = ({ data: of({ productSimType: new ProductSimType('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmwebTestModule],
        declarations: [ProductSimTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductSimTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductSimTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productSimType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productSimType).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
