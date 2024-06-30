import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSuccessWindowComponent } from './save-success-window.component';

describe('SaveSuccessWindowComponent', () => {
  let component: SaveSuccessWindowComponent;
  let fixture: ComponentFixture<SaveSuccessWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSuccessWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveSuccessWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
