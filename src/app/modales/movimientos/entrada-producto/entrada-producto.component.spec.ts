import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaProductoComponent } from './entrada-producto.component';

describe('EntradaProductoComponent', () => {
  let component: EntradaProductoComponent;
  let fixture: ComponentFixture<EntradaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
