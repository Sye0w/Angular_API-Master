import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, switchMap } from 'rxjs';
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

  fetchPostById(postId: number): Observable<IPost> {
    return this.apiService.fetchPostById(postId);
  }

  createPost(newPost: Partial<IPost>): Observable<IPost> {
    return this.posts$.pipe(
      switchMap(posts => {
        const latestPost = posts.length > 0 ? posts[posts.length - 1] : null;
        const newId = latestPost ? latestPost.id + 1 : 1;
        const newUserId = latestPost ? latestPost.userId : 1;

        const fullPost: IPost = {
          id: newId,
          userId: newUserId,
          ...newPost
        } as IPost;

        return this.apiService.createPost(fullPost);
      }),
      tap(createdPost => {
        const updatedPosts = [...this.postsSubject.value, createdPost];
        this.postsSubject.next(updatedPosts);
        this.lastFetchedId = createdPost.id;
      })
    );
  }
}
