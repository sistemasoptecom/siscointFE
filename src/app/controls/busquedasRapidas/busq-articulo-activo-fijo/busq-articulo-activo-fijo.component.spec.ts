import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqArticuloActivoFijoComponent } from './busq-articulo-activo-fijo.component';

describe('BusqArticuloActivoFijoComponent', () => {
  let component: BusqArticuloActivoFijoComponent;
  let fixture: ComponentFixture<BusqArticuloActivoFijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusqArticuloActivoFijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusqArticuloActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
