import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IPost } from '../post.interface';
import { IComment } from '../comment.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  fetchPost(): Observable<IPost[]>{
    return this.http.get<IPost[]>(`${this.apiUrl}/posts`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  fetchComments():Observable<IComment[]>{
    return this.http.get<IComment[]>(`${this.apiUrl}/comments`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    console.log('An error occurred:', error.message);
    return throwError('Something went wrong; please try again');

  }
}
