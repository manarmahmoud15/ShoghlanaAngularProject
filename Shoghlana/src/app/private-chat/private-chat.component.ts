import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualchatService } from '../Services/individualChat/individualchat.service';
import { MessagesComponent } from '../messages/messages.component';
import { ChatInputComponent } from '../ChatInput/chat-input/chat-input.component';

@Component({
  selector: 'app-private-chat',
  standalone: true,
  imports: [MessagesComponent , ChatInputComponent],
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, OnDestroy {
  @Input() toUser = '';

  constructor(public activeModal: NgbActiveModal , public _individualChatService: IndividualchatService) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._individualChatService.closePrivateChatMessage(this.toUser)
  }

  sendMessage( content :string ){
    this._individualChatService.sendPrivateMessage(this.toUser , content);
  }
}
