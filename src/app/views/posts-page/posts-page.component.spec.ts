import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsPageComponent } from './posts-page.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { By } from '@angular/platform-browser';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain PostListComponent', () => {
    const postListComponent = fixture.debugElement.query(By.directive(PostListComponent));
    expect(postListComponent).toBeTruthy();
  });

  it('should contain CreatePostComponent', () => {
    const createPostComponent = fixture.debugElement.query(By.directive(CreatePostComponent));
    expect(createPostComponent).toBeTruthy();
  });


  it('should have CreatePostComponent before PostListComponent', () => {
    const components = fixture.debugElement.queryAll(By.directive(PostListComponent) || By.directive(CreatePostComponent));
    expect(components[0].componentInstance instanceof CreatePostComponent).toBeTruthy();
    expect(components[1].componentInstance instanceof PostListComponent).toBeTruthy();
  });


});
