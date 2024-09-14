import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { catchError, Observable, of, retry } from 'rxjs';
import { IPost } from '../post.interface';
import { IComment } from '../comment.interface';
import { ErrorHandlingService } from './error-handling.service';
import { CachingService } from './caching.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient,
    private errorHandler: ErrorHandlingService,
    private cachingService: CachingService
  ) { }

  fetchPosts(): Observable<IPost[]>{
    const cacheKey = 'posts';
    const cachedPosts = this.cachingService.get(cacheKey);

    if(cachedPosts){
      return of(cachedPosts);
    }

    return this.http.get<IPost[]>(`${this.apiUrl}/posts`).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  fetchPostById(postId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/posts/${postId}`)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  fetchComments( postId: number):Observable<IComment[]>{
    return this.http.get<IComment[]>(`${this.apiUrl}/posts/${postId}/comments`)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    )
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, post)
    .pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post)
    .pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error))
    );
  }

}
