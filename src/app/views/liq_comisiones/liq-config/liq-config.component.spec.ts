import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqConfigComponent } from './liq-config.component';

describe('LiqConfigComponent', () => {
  let component: LiqConfigComponent;
  let fixture: ComponentFixture<LiqConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiqConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiqConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
