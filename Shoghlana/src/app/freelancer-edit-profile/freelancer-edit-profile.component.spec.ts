import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerEditProfileComponent } from './freelancer-edit-profile.component';

describe('FreelancerEditProfileComponent', () => {
  let component: FreelancerEditProfileComponent;
  let fixture: ComponentFixture<FreelancerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerEditProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
