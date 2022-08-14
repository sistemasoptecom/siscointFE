import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedarapidaComponent } from './busquedarapida.component';

describe('BusquedarapidaComponent', () => {
  let component: BusquedarapidaComponent;
  let fixture: ComponentFixture<BusquedarapidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedarapidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedarapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
