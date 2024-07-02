import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IndividualchatService } from '../../Services/individualChat/individualchat.service';

@Component({
  selector: 'app-individual-chat',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './individual-chat.component.html',
  styleUrl: './individual-chat.component.css'
})
export class IndividualChatComponent {
  constructor( public _individualChatService:IndividualchatService){}
  @Output() closeChatEmitter = new EventEmitter();
  backToHome(){
    this.closeChatEmitter.emit()
  }
}
