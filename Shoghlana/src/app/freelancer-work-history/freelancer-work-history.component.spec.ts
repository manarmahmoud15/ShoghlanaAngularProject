import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerWorkHistoryComponent } from './freelancer-work-history.component';

describe('FreelancerWorkHistoryComponent', () => {
  let component: FreelancerWorkHistoryComponent;
  let fixture: ComponentFixture<FreelancerWorkHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerWorkHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
