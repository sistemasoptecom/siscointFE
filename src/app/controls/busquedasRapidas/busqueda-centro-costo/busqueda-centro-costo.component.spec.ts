import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCentroCostoComponent } from './busqueda-centro-costo.component';

describe('BusquedaCentroCostoComponent', () => {
  let component: BusquedaCentroCostoComponent;
  let fixture: ComponentFixture<BusquedaCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaCentroCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
