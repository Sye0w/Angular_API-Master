import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cache: { [key: string]: { data: any, timestamp: number } } = {};
  private cachedDuration = 5 * 60 * 1000;

  constructor() { }

  set(key: string, data: any):void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    }
  }

  get(key: string):any | null {
    const cached = this.cache[key];
    if (!cached) {
      return null;
    }

    return cached.data;
  }

  clear(): void{
    this.cache = {};
  }
}
