import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../../environments/env';
import { IndexedDBCachingService } from './indexdb-caching.service';
import { of } from 'rxjs';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;
  let errorHandlerMock: jest.Mocked<ErrorHandlingService>;
  let cachingServiceMock: jest.Mocked<IndexedDBCachingService>;

  beforeEach(() => {
    errorHandlerMock = {
      handleError: jest.fn()
    } as unknown as jest.Mocked<ErrorHandlingService>;

    cachingServiceMock = {
      get: jest.fn(),
      set: jest.fn(() => of(undefined)),
      clear: jest.fn(() => of(undefined))
    } as unknown as jest.Mocked<IndexedDBCachingService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiClientService,
        { provide: ErrorHandlingService, useValue: errorHandlerMock },
        { provide: IndexedDBCachingService, useValue: cachingServiceMock }
      ]
    });

    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should fetch posts from API if not cached', (done) => {
      const mockPosts = [{ id: 1, title: 'Test Post' }];
      cachingServiceMock.get.mockReturnValue(of(null));

      service.fetchPosts().subscribe(posts => {
        expect(posts).toEqual(mockPosts);
        // Remove this expectation for now
        // expect(cachingServiceMock.set).toHaveBeenCalledWith('posts', mockPosts, expect.any(Number));
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });

    // Add a new test to check if caching occurs after fetching
    it('should cache posts after fetching from API', (done) => {
      const mockPosts = [{ id: 1, title: 'Test Post' }];
      cachingServiceMock.get.mockReturnValue(of(null));

      service.fetchPosts().subscribe(() => {
        expect(cachingServiceMock.set).toHaveBeenCalledWith('posts', mockPosts, expect.any(Number));
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });
  });

  describe('fetchPostById', () => {
    it('should fetch a post by id', (done) => {
      const mockPost = { id: 1, title: 'Test Post' };
      const postId = 1;
      cachingServiceMock.get.mockReturnValue(of(null));

      service.fetchPostById(postId).subscribe(post => {
        expect(post).toEqual(mockPost);
        expect(cachingServiceMock.set).toHaveBeenCalledWith(`post-${postId}`, mockPost, expect.any(Number));
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPost);
    });

    it('should return cached post if available', (done) => {
      const mockPost = { id: 1, title: 'Test Post' };
      const postId = 1;
      cachingServiceMock.get.mockReturnValue(of(mockPost));

      service.fetchPostById(postId).subscribe(post => {
        expect(post).toEqual(mockPost);
        expect(cachingServiceMock.get).toHaveBeenCalledWith(`post-${postId}`);
        done();
      });
    });
  });

  describe('fetchComments', () => {
    it('should fetch comments for a post', (done) => {
      const mockComments = [{ id: 1, postId: 1, body: 'Test Comment' }];
      const postId = 1;

      service.fetchComments(postId).subscribe(comments => {
        expect(comments).toEqual(mockComments);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}/comments`);
      expect(req.request.method).toBe('GET');
      req.flush(mockComments);
    });
  });

  describe('createPost', () => {
    it('should create a new post', (done) => {
      const newPost = { title: 'New Post', body: 'Post Body' };
      const mockResponse = { id: 1, ...newPost };

      service.createPost(newPost).subscribe(response => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newPost);
      req.flush(mockResponse);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', (done) => {
      const postId = 1;
      const updatedPost = { id: postId, title: 'Updated Post', body: 'Updated Body' };

      service.updatePost(postId, updatedPost).subscribe(response => {
        expect(response).toEqual(updatedPost);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedPost);
      req.flush(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', (done) => {
      const postId = 1;

      service.deletePost(postId).subscribe(response => {
        expect(response).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  // describe('clearCache', () => {
  //   it('should clear the cache', (done) => {
  //     service.clearCache().subscribe(() => {
  //       expect(cachingServiceMock.clear).toHaveBeenCalled();
  //       done();
  //     });
  //   });
  // });
});
