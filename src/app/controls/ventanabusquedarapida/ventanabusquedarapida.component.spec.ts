import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanabusquedarapidaComponent } from './ventanabusquedarapida.component';

describe('VentanabusquedarapidaComponent', () => {
  let component: VentanabusquedarapidaComponent;
  let fixture: ComponentFixture<VentanabusquedarapidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanabusquedarapidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanabusquedarapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
