import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksGalleryComponent } from './works-gallery.component';

describe('WorksGalleryComponent', () => {
  let component: WorksGalleryComponent;
  let fixture: ComponentFixture<WorksGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorksGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
