import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectComponent } from './addproject.component';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddprojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
