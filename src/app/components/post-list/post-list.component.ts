import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/revealon-scroll.directive';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, InfiniteScrollDirective, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts$: Observable<IPost[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiFacade: ApiFacadeService) {
    this.posts$ = this.apiFacade.posts$;
  }

  ngOnInit(): void {
    this.loadMorePosts();
  }

  loadMorePosts(): void {
    if (this.loading$.value) return;
    this.loading$.next(true);
    this.apiFacade.fetchMorePosts().subscribe({
      next: () => this.loading$.next(false),
      error: () => this.loading$.next(false)
    });
  }
}
