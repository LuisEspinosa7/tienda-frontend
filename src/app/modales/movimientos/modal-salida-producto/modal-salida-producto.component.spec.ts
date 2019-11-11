import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalidaProductoComponent } from './modal-salida-producto.component';

describe('ModalSalidaProductoComponent', () => {
  let component: ModalSalidaProductoComponent;
  let fixture: ComponentFixture<ModalSalidaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSalidaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSalidaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
