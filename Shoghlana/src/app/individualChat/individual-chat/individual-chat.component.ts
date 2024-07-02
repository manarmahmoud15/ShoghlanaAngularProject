import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndividualchatService } from '../../Services/individualChat/individualchat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-chat',
  standalone: true,
  imports: [RouterLink ,CommonModule],
  templateUrl: './individual-chat.component.html',
  styleUrl: './individual-chat.component.css'
})
export class IndividualChatComponent implements OnInit , OnDestroy{
  constructor( public _individualChatService:IndividualchatService){}

  ngOnInit(): void {
    this._individualChatService.createChatConnection()
  }

  @Output() closeChatEmitter = new EventEmitter();
  backToHome(){
    this.closeChatEmitter.emit()
  }
  ngOnDestroy(): void {
    this._individualChatService.stopChatConnection();
  }
}
