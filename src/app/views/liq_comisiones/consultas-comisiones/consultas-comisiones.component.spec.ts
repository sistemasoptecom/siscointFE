import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasComisionesComponent } from './consultas-comisiones.component';

describe('ConsultasComisionesComponent', () => {
  let component: ConsultasComisionesComponent;
  let fixture: ComponentFixture<ConsultasComisionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasComisionesComponent]
    });
    fixture = TestBed.createComponent(ConsultasComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
