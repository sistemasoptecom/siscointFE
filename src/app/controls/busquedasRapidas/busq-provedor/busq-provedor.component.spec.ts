import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqProvedorComponent } from './busq-provedor.component';

describe('BusqProvedorComponent', () => {
  let component: BusqProvedorComponent;
  let fixture: ComponentFixture<BusqProvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusqProvedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusqProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
