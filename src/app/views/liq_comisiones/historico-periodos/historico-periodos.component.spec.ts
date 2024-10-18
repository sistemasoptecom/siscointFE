import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPeriodosComponent } from './historico-periodos.component';

describe('HistoricoPeriodosComponent', () => {
  let component: HistoricoPeriodosComponent;
  let fixture: ComponentFixture<HistoricoPeriodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoPeriodosComponent]
    });
    fixture = TestBed.createComponent(HistoricoPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
