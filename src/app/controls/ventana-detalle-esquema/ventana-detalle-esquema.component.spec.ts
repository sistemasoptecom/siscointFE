import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaDetalleEsquemaComponent } from './ventana-detalle-esquema.component';

describe('VentanaDetalleEsquemaComponent', () => {
  let component: VentanaDetalleEsquemaComponent;
  let fixture: ComponentFixture<VentanaDetalleEsquemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaDetalleEsquemaComponent]
    });
    fixture = TestBed.createComponent(VentanaDetalleEsquemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
