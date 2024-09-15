import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CachingService {
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private cacheDuration = 5 * 60 * 1000;

  set(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
  }

  get(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.cacheDuration;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return cached.data;
  }

  clear(): void {
    this.cache = {};
  }
}
