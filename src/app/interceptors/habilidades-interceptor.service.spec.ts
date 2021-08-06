import { TestBed } from '@angular/core/testing';

import { HabilidadesInterceptorService } from './habilidades-interceptor.service';

describe('HabilidadesInterceptorService', () => {
  let service: HabilidadesInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilidadesInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
