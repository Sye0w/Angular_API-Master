import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSettingsComponent } from './detail-settings.component';

describe('DetailSettingsComponent', () => {
  let component: DetailSettingsComponent;
  let fixture: ComponentFixture<DetailSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
