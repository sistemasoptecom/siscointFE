import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEntradasComponent } from './gestion-entradas.component';

describe('GestionEntradasComponent', () => {
  let component: GestionEntradasComponent;
  let fixture: ComponentFixture<GestionEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEntradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
