import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporteCartaMetaComponent } from './importe-carta-meta.component';

describe('ImporteCartaMetaComponent', () => {
  let component: ImporteCartaMetaComponent;
  let fixture: ComponentFixture<ImporteCartaMetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImporteCartaMetaComponent]
    });
    fixture = TestBed.createComponent(ImporteCartaMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
