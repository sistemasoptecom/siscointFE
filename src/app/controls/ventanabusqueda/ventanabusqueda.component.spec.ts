import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanabusquedaComponent } from './ventanabusqueda.component';

describe('VentanabusquedaComponent', () => {
  let component: VentanabusquedaComponent;
  let fixture: ComponentFixture<VentanabusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanabusquedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanabusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
