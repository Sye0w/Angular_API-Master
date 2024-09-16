import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailPageComponent } from './post-detail-page.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { of } from 'rxjs';
import { IPost } from '../../model/post.interface';
import { IComment } from '../../model/comment.interface';
import { By } from '@angular/platform-browser';
import { DetailSettingsComponent } from "../../components/detail-settings/detail-settings.component";

describe('PostDetailPageComponent', () => {
  let component: PostDetailPageComponent;
  let fixture: ComponentFixture<PostDetailPageComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockApiFacade: jest.Mocked<ApiFacadeService>;

  const mockPost: IPost = { id: 1, userId: 1, title: 'Test Post', body: 'This is a test post' };
  const mockComments: IComment[] = [
    { id: 1, postId: 1, name: 'Comment 1', email: 'test1@example.com', body: 'This is comment 1' },
    { id: 2, postId: 1, name: 'Comment 2', email: 'test2@example.com', body: 'This is comment 2' }
  ];

  beforeEach(async () => {
    const paramMapMock = {
      has: jest.fn().mockReturnValue(true),
      get: jest.fn().mockReturnValue('1'),
      getAll: jest.fn().mockReturnValue([]),
      keys: [],
    };

    mockActivatedRoute = {
      paramMap: of(paramMapMock as ParamMap)
    };

    mockApiFacade = {
      fetchPostById: jest.fn().mockReturnValue(of(mockPost)),
      fetchCommentsByPostId: jest.fn().mockReturnValue(of(mockComments))
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PostDetailPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiFacadeService, useValue: mockApiFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post details on init', (done) => {
    component.post$.subscribe(post => {
      expect(post).toEqual(mockPost);
      expect(mockApiFacade.fetchPostById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should fetch comments after fetching post', (done) => {
    component.comments$.subscribe(comments => {
      expect(comments).toEqual(mockComments);
      expect(mockApiFacade.fetchCommentsByPostId).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should contain DetailSettingsComponent', () => {
    const detailSettingsComponent = fixture.debugElement.query(By.directive(DetailSettingsComponent));
    expect(detailSettingsComponent).toBeTruthy();
  });

  it('should display post title', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain(mockPost.title);
  });

  it('should display post body', () => {
    fixture.detectChanges();
    const bodyElement = fixture.debugElement.query(By.css('p'));
    expect(bodyElement.nativeElement.textContent).toContain(mockPost.body);
  });

  it('should display comments', () => {
    fixture.detectChanges();
    const commentElements = fixture.debugElement.queryAll(By.css('.comment'));
    expect(commentElements.length).toBe(mockComments.length);
  });
});
