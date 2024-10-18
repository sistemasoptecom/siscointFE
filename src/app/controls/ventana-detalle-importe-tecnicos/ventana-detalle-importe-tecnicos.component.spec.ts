import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaDetalleImporteTecnicosComponent } from './ventana-detalle-importe-tecnicos.component';

describe('VentanaDetalleImporteTecnicosComponent', () => {
  let component: VentanaDetalleImporteTecnicosComponent;
  let fixture: ComponentFixture<VentanaDetalleImporteTecnicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaDetalleImporteTecnicosComponent]
    });
    fixture = TestBed.createComponent(VentanaDetalleImporteTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
