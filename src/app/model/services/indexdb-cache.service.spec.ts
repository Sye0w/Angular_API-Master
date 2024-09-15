import { TestBed } from '@angular/core/testing';

import { IndexdbCacheService } from './indexdb-cache.service';

describe('IndexdbCacheService', () => {
  let service: IndexdbCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexdbCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
