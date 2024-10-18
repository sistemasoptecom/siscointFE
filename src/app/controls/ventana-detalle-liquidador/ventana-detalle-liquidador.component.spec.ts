import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaDetalleLiquidadorComponent } from './ventana-detalle-liquidador.component';

describe('VentanaDetalleLiquidadorComponent', () => {
  let component: VentanaDetalleLiquidadorComponent;
  let fixture: ComponentFixture<VentanaDetalleLiquidadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaDetalleLiquidadorComponent]
    });
    fixture = TestBed.createComponent(VentanaDetalleLiquidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
