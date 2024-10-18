import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaTokenComponent } from './ventana-token.component';

describe('VentanaTokenComponent', () => {
  let component: VentanaTokenComponent;
  let fixture: ComponentFixture<VentanaTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaTokenComponent]
    });
    fixture = TestBed.createComponent(VentanaTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
