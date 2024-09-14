import { Injectable } from '@angular/core';
import {
   HttpRequest, HttpHandler
  ,HttpEvent,HttpInterceptor }
  from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer mock-jwt-token')
    });

    console.log('Outgoing HTTP request', authReq);

    return next.handle(authReq).pipe(
      tap({
        next: event => console.log('HTTP response', event),
        error: error => console.error('HTTP error', error)
      })
    );
  }

}
