import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaProductosComponent } from './entrada-productos.component';

describe('EntradaProductosComponent', () => {
  let component: EntradaProductosComponent;
  let fixture: ComponentFixture<EntradaProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
