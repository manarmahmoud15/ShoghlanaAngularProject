import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectionPopupComponent } from './role-selection-popup.component';

describe('RoleSelectionPopupComponent', () => {
  let component: RoleSelectionPopupComponent;
  let fixture: ComponentFixture<RoleSelectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSelectionPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleSelectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
