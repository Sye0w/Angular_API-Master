import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { of, throwError } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { By } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../directives/revealon-scroll.directive';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiFacadeMock: jest.Mocked<ApiFacadeService>;

  const mockPosts: IPost[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
    { userId: 1, id: 2, title: 'Post 2', body: 'Body 2' },
  ];

  beforeEach(async () => {
    apiFacadeMock = {
      fetchMorePosts: jest.fn(),
      posts$: of(mockPosts)
    } as any;

    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        { provide: ApiFacadeService, useValue: apiFacadeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with posts from ApiFacadeService', (done) => {
    component.posts$.subscribe(posts => {
      expect(posts).toEqual(mockPosts);
      done();
    });
  });

  it('should call loadMorePosts on initialization', () => {
    jest.spyOn(component, 'loadMorePosts');
    component.ngOnInit();
    expect(component.loadMorePosts).toHaveBeenCalled();
  });

  it('should load more posts when loadMorePosts is called', () => {
    const newPosts: IPost[] = [
      { userId: 2, id: 3, title: 'Post 3', body: 'Body 3' },
      { userId: 2, id: 4, title: 'Post 4', body: 'Body 4' },
    ];
    apiFacadeMock.fetchMorePosts.mockReturnValue(of(newPosts));
    component.loadMorePosts();
    expect(apiFacadeMock.fetchMorePosts).toHaveBeenCalled();
    expect(component.loading$.value).toBeFalsy();
  });

  it('should handle errors when loading more posts', () => {
    apiFacadeMock.fetchMorePosts.mockReturnValue(throwError(() => new Error('API Error')));
    component.loadMorePosts();
    expect(apiFacadeMock.fetchMorePosts).toHaveBeenCalled();
    expect(component.loading$.value).toBeFalsy();
  });

  it('should not call fetchMorePosts if already loading', () => {
    component.loading$.next(true);
    component.loadMorePosts();
    expect(apiFacadeMock.fetchMorePosts).not.toHaveBeenCalled();
  });

  it('should have RevealOnScrollDirective', () => {
    const directive = fixture.debugElement.query(By.directive(RevealOnScrollDirective));
    expect(directive).toBeTruthy();
  });

  it('should have InfiniteScrollDirective', () => {
    const directive = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
    expect(directive).toBeTruthy();
  });
});
