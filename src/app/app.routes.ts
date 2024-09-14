import { Routes } from '@angular/router';
import { PostsPageComponent } from './views/posts-page/posts-page.component';

export const routes: Routes = [
  {
    path: 'post-detail-page/:id',
    loadComponent: () =>
    import('./views/post-detail-page/post-detail-page.component')
    .then(m => m.PostDetailPageComponent)
  },
  {path: '**', component: PostsPageComponent}
];
