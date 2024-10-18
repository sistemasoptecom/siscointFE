import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesEntregasComponent } from './reportes-entregas.component';

describe('ReportesEntregasComponent', () => {
  let component: ReportesEntregasComponent;
  let fixture: ComponentFixture<ReportesEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesEntregasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
