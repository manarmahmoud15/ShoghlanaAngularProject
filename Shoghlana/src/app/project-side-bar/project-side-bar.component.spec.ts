import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSideBarComponent } from './project-side-bar.component';

describe('ProjectSideBarComponent', () => {
  let component: ProjectSideBarComponent;
  let fixture: ComponentFixture<ProjectSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
