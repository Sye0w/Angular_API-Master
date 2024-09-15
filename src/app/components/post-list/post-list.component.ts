import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directive/revealon-scroll.directive';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule,RevealOnScrollDirective],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  posts$!: Observable<IPost[]>

  constructor( private apiFacade : ApiFacadeService ){}

  ngOnInit():void{
    this.apiFacade.fetchPosts()
    this.posts$ = this.apiFacade.posts$;
  }
}
