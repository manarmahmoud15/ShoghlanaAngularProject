import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersComponent } from './freelancers.component';

describe('FreelancersComponent', () => {
  let component: FreelancersComponent;
  let fixture: ComponentFixture<FreelancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
