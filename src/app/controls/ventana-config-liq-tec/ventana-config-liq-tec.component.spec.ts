import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaConfigLiqTecComponent } from './ventana-config-liq-tec.component';

describe('VentanaConfigLiqTecComponent', () => {
  let component: VentanaConfigLiqTecComponent;
  let fixture: ComponentFixture<VentanaConfigLiqTecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaConfigLiqTecComponent]
    });
    fixture = TestBed.createComponent(VentanaConfigLiqTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
