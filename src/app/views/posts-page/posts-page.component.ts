import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from "../../components/post-list/post-list.component";
import { CreatePostComponent } from "../../components/create-post/create-post.component";

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PostListComponent, CreatePostComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})

export class PostsPageComponent {

}
