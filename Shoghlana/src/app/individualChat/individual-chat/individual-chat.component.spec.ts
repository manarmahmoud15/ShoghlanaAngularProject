import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualChatComponent } from './individual-chat.component';

describe('IndividualChatComponent', () => {
  let component: IndividualChatComponent;
  let fixture: ComponentFixture<IndividualChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
