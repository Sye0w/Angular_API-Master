import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IPost } from '../post.interface';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})

export class ApiFacadeService {
  postsSubject = new BehaviorSubject<IPost[]>([]);
  posts$ = this.postsSubject.asObservable()

  constructor(private apiService: ApiClientService) { }

  fetchPosts() {
    return this.apiService.fetchPosts()
    .pipe(
      tap(posts => {
        console.log(posts);
        this.postsSubject.next(posts)
      })
    ).subscribe()
  }
}
