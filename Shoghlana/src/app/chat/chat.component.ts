import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ChatService } from '../Services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit ,AfterViewChecked{

  ChatService = inject(ChatService);
  inputMessage = "";
  messages : any []= [];
  router = inject(Router);
  loggedInUserName = sessionStorage.getItem("user");
  roomName =sessionStorage.getItem("room");
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  ngOnInit(): void {
    this.ChatService.messages$.subscribe(res=>{
      this.messages = res;
      console.log(this.messages)
    });

  }
  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
  }
  sendMessage(){
    this.ChatService.sendMessage(this.inputMessage)
    .then(()=>{
      this.inputMessage = '';
    }).catch((err)=>{
      console.log(err)
    })
  }
  leaveChat(){
    this.ChatService.leaveChat()
    .then(()=>{
      this.router.navigate(['welcome']);
      setTimeout(()=>{
        location.reload();
      },0)
    }).catch((err)=>{
      console.log(err)
    })
  }
}
