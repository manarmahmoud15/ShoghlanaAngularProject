import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-chat',
  standalone: true,
  imports: [],
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, OnDestroy {
  @Input() toUser = '';

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // Initialization logic here
    console.log('PrivateChatComponent initialized with toUser:', this.toUser);
  }

  ngOnDestroy(): void {
    // Cleanup logic here
    console.log('PrivateChatComponent destroyed');
  }

  closeModal() {
    this.activeModal.close();
  }
}
