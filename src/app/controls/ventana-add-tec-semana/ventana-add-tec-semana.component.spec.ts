import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAddTecSemanaComponent } from './ventana-add-tec-semana.component';

describe('VentanaAddTecSemanaComponent', () => {
  let component: VentanaAddTecSemanaComponent;
  let fixture: ComponentFixture<VentanaAddTecSemanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaAddTecSemanaComponent]
    });
    fixture = TestBed.createComponent(VentanaAddTecSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
