import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiFacadeService } from './api-facade.service';
import { ApiClientService } from './api-client.service';
import { ErrorHandlingService } from './error-handling.service';

import { of } from 'rxjs';
import { IPost } from '../post.interface';
import { IndexedDBCachingService } from './indexdb-caching.service';

describe('ApiFacadeService', () => {
  let service: ApiFacadeService;
  let apiClientServiceMock: jest.Mocked<ApiClientService>;

  beforeEach(() => {
    apiClientServiceMock = {
      fetchPosts: jest.fn()
    } as unknown as jest.Mocked<ApiClientService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiFacadeService,
        { provide: ApiClientService, useValue: apiClientServiceMock },
        ErrorHandlingService,
        IndexedDBCachingService
      ]
    });

    service = TestBed.inject(ApiFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should fetch posts and update postsSubject', (done) => {
      const mockPosts: IPost[] = [
        { id: 1, title: 'Test Post', userId: 1, body: 'This is a test post body' }
      ];
      apiClientServiceMock.fetchPosts.mockReturnValue(of(mockPosts));

      service.fetchPosts();

      service.posts$.subscribe(posts => {
        expect(posts).toEqual(mockPosts);
        expect(apiClientServiceMock.fetchPosts).toHaveBeenCalled();
        done();
      });
    });
  });
});
