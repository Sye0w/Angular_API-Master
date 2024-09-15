import { TestBed } from '@angular/core/testing';

import { IndexedDBCachingService } from './indexdb-caching.service';

describe('IndexdbCachingService', () => {
  let service: IndexedDBCachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDBCachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
