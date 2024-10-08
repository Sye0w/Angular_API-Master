import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { IPost } from '../../model/post.interface';
import { IComment } from '../../model/comment.interface';
import { DetailSettingsComponent } from "../../components/detail-settings/detail-settings.component";

@Component({
  selector: 'app-post-detail-page',
  standalone: true,
  imports: [CommonModule, DetailSettingsComponent, RouterLink],
  templateUrl: './post-detail-page.component.html',
  styleUrl: './post-detail-page.component.scss'
})
export class PostDetailPageComponent implements OnInit {
  post$!: Observable<IPost>;
  comments$!: Observable<IComment[]>;

  constructor(
    private route: ActivatedRoute,
    private apiFacade: ApiFacadeService
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
        const postId = Number(params.get('id'));
        return this.apiFacade.fetchPostById(postId);
      }),
      tap(post => {
        this.comments$ = this.apiFacade.fetchCommentsByPostId(post.id);
      })
    );
  }
}
