import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsBusquedaComponent } from './inputs-busqueda.component';

describe('InputsBusquedaComponent', () => {
  let component: InputsBusquedaComponent;
  let fixture: ComponentFixture<InputsBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputsBusquedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
