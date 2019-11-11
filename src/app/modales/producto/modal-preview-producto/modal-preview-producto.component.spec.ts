import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreviewProductoComponent } from './modal-preview-producto.component';

describe('ModalPreviewProductoComponent', () => {
  let component: ModalPreviewProductoComponent;
  let fixture: ComponentFixture<ModalPreviewProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreviewProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreviewProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
