import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { CommonModule } from '@angular/common';
import { PostListComponent } from "../../components/post-list/post-list.component";

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})

export class PostsPageComponent {

}
