import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from '../post.interface';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFacadeService {
  private postsSubject = new BehaviorSubject<IPost[]>([]);
  posts$ = this.postsSubject.asObservable();
  private lastFetchedId = 0;

  constructor(private apiService: ApiClientService) { }

  fetchMorePosts(): Observable<IPost[]> {
    return this.apiService.fetchPosts(this.lastFetchedId).pipe(
      tap(newPosts => {
        if (newPosts.length > 0) {
          const updatedPosts = [...this.postsSubject.value, ...newPosts];
          this.postsSubject.next(updatedPosts);
          this.lastFetchedId = updatedPosts[updatedPosts.length - 1].id;
        }
      })
    );
  }
}
