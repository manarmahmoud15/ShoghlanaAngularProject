import { Component, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndividualchatService } from '../../Services/individualChat/individualchat.service';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../../ChatInput/chat-input/chat-input.component';
import { MessagesComponent } from '../../messages/messages.component';

@Component({
  selector: 'app-individual-chat',
  standalone: true,
  imports: [RouterLink ,CommonModule ,ChatInputComponent , MessagesComponent],
  templateUrl: './individual-chat.component.html',
  styleUrl: './individual-chat.component.css'
})
export class IndividualChatComponent implements OnInit , OnDestroy{
  constructor( public _individualChatService:IndividualchatService ,private ngZone: NgZone){}

  ngOnInit(): void {
    this._individualChatService.createChatConnection()
  }
  // performHeavyTask() {
  //   this.ngZone.runOutsideAngular(() => {
  //     // Long-running task here
  //     // After completion, re-enter Angular zone if needed
  //     this.ngZone.run(() => {
  //       // Code to update the Angular application state
  //     });
  //   });
  // }
  @Output() closeChatEmitter = new EventEmitter();
  backToHome(){
    this.closeChatEmitter.emit()
  }
  ngOnDestroy(): void {
    this._individualChatService.stopChatConnection();
  }
  sendMessages(content :string){
    this._individualChatService.sendMessage(content);

  }
  openPrivateChat(toUser :string){

  }
}
