import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportePlanitllaComponent } from './importe-planitlla.component';

describe('ImportePlanitllaComponent', () => {
  let component: ImportePlanitllaComponent;
  let fixture: ComponentFixture<ImportePlanitllaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportePlanitllaComponent]
    });
    fixture = TestBed.createComponent(ImportePlanitllaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
