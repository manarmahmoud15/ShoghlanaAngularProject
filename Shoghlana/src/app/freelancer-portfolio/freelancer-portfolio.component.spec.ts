import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPortfolioComponent } from './freelancer-portfolio.component';

describe('FreelancerPortfolioComponent', () => {
  let component: FreelancerPortfolioComponent;
  let fixture: ComponentFixture<FreelancerPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreelancerPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
