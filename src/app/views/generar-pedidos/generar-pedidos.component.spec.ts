import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPedidosComponent } from './generar-pedidos.component';

describe('GenerarPedidosComponent', () => {
  let component: GenerarPedidosComponent;
  let fixture: ComponentFixture<GenerarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
