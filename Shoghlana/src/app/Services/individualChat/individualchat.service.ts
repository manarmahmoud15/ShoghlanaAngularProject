import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../Models/user';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { error } from 'console';
import { Message } from '../../Models/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateChatComponent } from '../../private-chat/private-chat.component';

@Injectable({
  providedIn: 'root',
})
export class IndividualchatService {
  myName: User | null = null;
  private individualChatConnection?: HubConnection;
  OnlineUsers: string[] = [];
  messages: Message[] = [];
  privateMessages: Message[] = [];
  privateMessageInitial = false;
  private _individualChatService: any;
  constructor(private httpClient: HttpClient , private modalservice: NgbModal) {}

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(
      `${environment.baseUrl}/chat/register-user`,
      user,
      { headers, responseType: 'text' }
    );
  }
  createChatConnection() {
    this.individualChatConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5092/individualChatHub`)
      .withAutomaticReconnect()
      .build();

    this.individualChatConnection.start().catch((err) => console.log(err));

    this.individualChatConnection.on('UserConnected', () => {
      console.log('the server has called here');
      if (this.myName) {
        this.addUserConnectionId(this.myName);
      }
    });

    this.individualChatConnection.on('OnlineUsers', (OnlineUsers) => {
      this.OnlineUsers = [...OnlineUsers];
    });
    this.individualChatConnection.on('NewMessage', (NewMessage: Message) => {
      this.messages = [...this.messages, NewMessage];
    });
    this.individualChatConnection.on('openPrivateChat', (NewMessage: Message) => {
      this.privateMessages = [...this.privateMessages, NewMessage];
      this.privateMessageInitial = true ;
      const modalRef = this.modalservice.open(PrivateChatComponent);
      modalRef.componentInstance.toUser = NewMessage.from 
    });
    this.individualChatConnection.on('NewPrivateMessage', (NewMessage: Message) => {
      this.privateMessages = [...this.privateMessages, NewMessage];
    });
    this.individualChatConnection.on('ClosePrivateChat', () => {
      this.privateMessageInitial = false;
      this.privateMessages = [];
      this.modalservice.dismissAll();
    });
  }

  stopChatConnection() {
    this.individualChatConnection?.stop().catch((err) => console.log(err));
  }

  async addUserConnectionId(name: User) {
    try {
      await this.individualChatConnection?.invoke(
        'AddUserConnectionId',
        name.name
      );
    } catch (error) {
      console.error('Error invoking AddUserConnectionId:', error);
    }
  }
  async sendMessage(content: string) {
    if (!this.myName) {
      throw new Error('User name is not set.');
    }
    const message: Message = {
      from: this.myName.name,
      content: content,
    };
    return this.individualChatConnection
      ?.invoke('ReceiveMessage', message)
      .catch((error) => console.log(error));
  }
  async sendPrivateMessage(to: string, content: string) {
    if (!this.myName) {
      throw new Error('User name is not set.');
    }
    const message: Message = {
      from: this.myName.name,
      to ,
      content: content,
    };
    if (!this.privateMessageInitial) {
      this.privateMessageInitial = true;
      return this.individualChatConnection
        ?.invoke('createPrivateChat', message)
        .then(()=>{
          this.privateMessages = [...this.privateMessages , message];
        })
        .catch((error) => console.log(error));
    }else {
      return this.individualChatConnection?.invoke('ReceivePrivateMessage' , message).catch(error => console.log(error))

    }
  }
  async closePrivateChatMessage(otherUser: string) {
    try {
      await this.individualChatConnection?.invoke(
        'RemovePrivateChat',
        this.myName,
        otherUser
      );
    } catch (error) {
      console.error('Error invoking AddUserConnectionId:', error);
    }
  }
}
