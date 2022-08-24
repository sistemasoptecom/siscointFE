import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqEmpleadoComponent } from './busq-empleado.component';

describe('BusqEmpleadoComponent', () => {
  let component: BusqEmpleadoComponent;
  let fixture: ComponentFixture<BusqEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusqEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusqEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
