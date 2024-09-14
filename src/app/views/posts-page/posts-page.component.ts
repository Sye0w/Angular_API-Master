import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})

export class PostsPageComponent {
  posts$!: Observable<IPost[]>

  constructor( private apiFacade : ApiFacadeService ){}

  ngOnInit():void{
    this.apiFacade.fetchPosts()

    this.posts$ = this.apiFacade.posts$;
  }
}
