import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaRecalculaSuperComponent } from './ventana-recalcula-super.component';

describe('VentanaRecalculaSuperComponent', () => {
  let component: VentanaRecalculaSuperComponent;
  let fixture: ComponentFixture<VentanaRecalculaSuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaRecalculaSuperComponent]
    });
    fixture = TestBed.createComponent(VentanaRecalculaSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
