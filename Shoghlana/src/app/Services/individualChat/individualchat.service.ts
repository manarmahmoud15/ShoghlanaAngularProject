import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../Models/user';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class IndividualchatService {
  myName: User | null = null;
  private individualChatConnection?: HubConnection;
  OnlineUsers: string[] = []
  constructor(private httpClient: HttpClient) {}

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

    this.individualChatConnection.on('UserConnected' , ()=>{
      console.log('the server has called here')
      if (this.myName) {
        this.addUserConnectionId(this.myName);
      }
    })

    this.individualChatConnection.on('OnlineUsers' , (OnlineUsers)=>{
      this.OnlineUsers = [...OnlineUsers];
    })

  }

  stopChatConnection() {
    this.individualChatConnection?.stop().catch((err) => console.log(err));
  }

  async addUserConnectionId(name: User) {
    try {
      await this.individualChatConnection?.invoke('AddUserConnectionId', name.name);
    } catch (error) {
      console.error('Error invoking AddUserConnectionId:', error);
    }
  }
}