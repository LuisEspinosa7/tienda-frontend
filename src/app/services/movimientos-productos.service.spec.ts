import { TestBed } from '@angular/core/testing';

import { MovimientosProductosService } from './movimientos-productos.service';

describe('MovimientosProductosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimientosProductosService = TestBed.get(MovimientosProductosService);
    expect(service).toBeTruthy();
  });
});
