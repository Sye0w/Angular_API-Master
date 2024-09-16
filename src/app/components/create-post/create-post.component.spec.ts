import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostComponent } from './create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { of, throwError } from 'rxjs';
import { IPost } from '../../model/post.interface';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let messageServiceMock: jest.Mocked<MessageService>;
  let apiFacadeMock: jest.Mocked<ApiFacadeService>;

  beforeEach(async () => {
    messageServiceMock = {
      add: jest.fn()
    } as any;

    apiFacadeMock = {
      createPost: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [CreatePostComponent, ReactiveFormsModule],
      providers: [
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ApiFacadeService, useValue: apiFacadeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.postForm.get('title')?.value).toBe('');
    expect(component.postForm.get('body')?.value).toBe('');
  });

  it('should show dialog when showDialog is called', () => {
    component.showDialog();
    expect(component.visible).toBe(true);
  });

  it('should hide dialog and reset form when hideDialog is called', () => {
    component.postForm.patchValue({ title: 'Test', body: 'Test body' });
    component.hideDialog();
    expect(component.visible).toBe(false);
    expect(component.postForm.get('title')?.value).toBe('');
    expect(component.postForm.get('body')?.value).toBe('');
  });

  it('should not create post when form is invalid', () => {
    component.createPost();
    expect(apiFacadeMock.createPost).not.toHaveBeenCalled();
    expect(messageServiceMock.add).not.toHaveBeenCalled();
  });

  it('should create post when form is valid', () => {
    const mockPost: IPost = { id: 1, userId: 1, title: 'Test Post', body: 'This is a test post body' };
    apiFacadeMock.createPost.mockReturnValue(of(mockPost));

    component.postForm.patchValue({ title: 'Test Post', body: 'This is a test post body' });
    component.createPost();

    expect(apiFacadeMock.createPost).toHaveBeenCalledWith({ title: 'Test Post', body: 'This is a test post body' });
    expect(messageServiceMock.add).toHaveBeenCalledWith({severity:'success', summary: 'Success', detail: 'Post created successfully'});
    expect(component.visible).toBe(false);
  });

  it('should show error message when post creation fails', () => {
    apiFacadeMock.createPost.mockReturnValue(throwError(() => new Error('API Error')));

    component.postForm.patchValue({ title: 'Test Post', body: 'This is a test post body' });
    component.createPost();

    expect(apiFacadeMock.createPost).toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith({severity:'error', summary: 'Error', detail: 'Failed to create post'});
    expect(component.visible).toBe(true);
  });
});
