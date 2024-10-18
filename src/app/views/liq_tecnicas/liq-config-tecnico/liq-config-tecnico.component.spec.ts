import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqConfigTecnicoComponent } from './liq-config-tecnico.component';

describe('LiqConfigTecnicoComponent', () => {
  let component: LiqConfigTecnicoComponent;
  let fixture: ComponentFixture<LiqConfigTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiqConfigTecnicoComponent]
    });
    fixture = TestBed.createComponent(LiqConfigTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
