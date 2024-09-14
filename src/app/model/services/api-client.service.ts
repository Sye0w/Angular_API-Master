import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IPost } from '../post.interface';
import { IComment } from '../comment.interface';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) { }

  fetchPost(): Observable<IPost[]>{
    return this.http.get<IPost[]>(`${this.apiUrl}/posts`).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error)
      })
    );
  }

  fetchComments():Observable<IComment[]>{
    return this.http.get<IComment[]>(`${this.apiUrl}/comments`)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error)
      })
    )
  }


}
