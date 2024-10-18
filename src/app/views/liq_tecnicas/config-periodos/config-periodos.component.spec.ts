import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPeriodosComponent } from './config-periodos.component';

describe('ConfigPeriodosComponent', () => {
  let component: ConfigPeriodosComponent;
  let fixture: ComponentFixture<ConfigPeriodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPeriodosComponent]
    });
    fixture = TestBed.createComponent(ConfigPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
