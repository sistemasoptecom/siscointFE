import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPuntajeComponent } from './conf-puntaje.component';

describe('ConfPuntajeComponent', () => {
  let component: ConfPuntajeComponent;
  let fixture: ComponentFixture<ConfPuntajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfPuntajeComponent]
    });
    fixture = TestBed.createComponent(ConfPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
