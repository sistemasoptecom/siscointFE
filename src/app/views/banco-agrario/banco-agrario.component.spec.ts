import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoAgrarioComponent } from './banco-agrario.component';

describe('BancoAgrarioComponent', () => {
  let component: BancoAgrarioComponent;
  let fixture: ComponentFixture<BancoAgrarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoAgrarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoAgrarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
