import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsComponent ,CommonModule , RouterLink]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
