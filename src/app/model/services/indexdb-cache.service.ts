import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBCacheService {
  private dbName = 'ApiCache';
  private storeName = 'cache';
  private dbVersion = 1;

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, { keyPath: 'key' });
      };
    });
  }

  set(key: string, value: any, ttl: number): Observable<void> {
    return from(this.openDatabase()).pipe(
      map(db => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const expiry = Date.now() + ttl * 1000;
        store.put({ key, value, expiry });
        db.close();
      }),
      catchError(error => {
        console.error('Error setting cache:', error);
        return of(undefined);
      })
    );
  }

  get(key: string): Observable<any> {
    return from(this.openDatabase()).pipe(
      map(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(this.storeName, 'readonly');
          const store = transaction.objectStore(this.storeName);
          const request = store.get(key);

          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const data = request.result;
            if (data && data.expiry > Date.now()) {
              resolve(data.value);
            } else {
              resolve(null);
            }
          };

          db.close();
        });
      }),
      catchError(error => {
        console.error('Error getting from cache:', error);
        return of(null);
      })
    );
  }

  clear(): Observable<void> {
    return from(this.openDatabase()).pipe(
      map(db => {
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        store.clear();
        db.close();
      }),
      catchError(error => {
        console.error('Error clearing cache:', error);
        return of(undefined);
      })
    );
  }
}
