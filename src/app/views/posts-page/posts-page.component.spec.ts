import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsPageComponent } from './posts-page.component';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { ApiClientService } from '../../model/services/api-client.service';
import { ErrorHandlingService } from '../../model/services/error-handling.service';
import { CachingService } from '../../model/services/caching.service';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsPageComponent],
      providers: [
        ApiFacadeService,
        ApiClientService,
        ErrorHandlingService,
        CachingService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
