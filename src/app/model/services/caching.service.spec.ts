import { TestBed } from '@angular/core/testing';
import { CachingService } from './caching.service';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachingService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      const key = 'testKey';
      const data = { test: 'data' };

      service.set(key, data);
      const retrieved = service.get(key);

      expect(retrieved).toEqual(data);
    });

    it('should return null for non-existent key', () => {
      const retrieved = service.get('nonExistentKey');
      expect(retrieved).toBeNull();
    });

    it('should return null for expired data', () => {
      const key = 'expiringKey';
      const data = { test: 'expiring' };

      service.set(key, data);

      
      jest.advanceTimersByTime(300000);

      const retrieved = service.get(key);
      expect(retrieved).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all cached data', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');

      service.clear();

      expect(service.get('key1')).toBeNull();
      expect(service.get('key2')).toBeNull();
    });
  });
});
