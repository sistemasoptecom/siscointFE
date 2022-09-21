import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqArticuloDevolucionComponent } from './busq-articulo-devolucion.component';

describe('BusqArticuloDevolucionComponent', () => {
  let component: BusqArticuloDevolucionComponent;
  let fixture: ComponentFixture<BusqArticuloDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusqArticuloDevolucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusqArticuloDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
