import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaLiqDetalleSupervisorComponent } from './ventana-liq-detalle-supervisor.component';

describe('VentanaLiqDetalleSupervisorComponent', () => {
  let component: VentanaLiqDetalleSupervisorComponent;
  let fixture: ComponentFixture<VentanaLiqDetalleSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaLiqDetalleSupervisorComponent]
    });
    fixture = TestBed.createComponent(VentanaLiqDetalleSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
