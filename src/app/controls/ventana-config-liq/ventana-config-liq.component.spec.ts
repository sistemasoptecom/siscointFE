import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaConfigLiqComponent } from './ventana-config-liq.component';

describe('VentanaConfigLiqComponent', () => {
  let component: VentanaConfigLiqComponent;
  let fixture: ComponentFixture<VentanaConfigLiqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaConfigLiqComponent]
    });
    fixture = TestBed.createComponent(VentanaConfigLiqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
