import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, timeout } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5092/ChatHub")
  .configureLogging(signalR.LogLevel.Information)
  .build()

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ =new BehaviorSubject<string[]>([]);
  public messages : any[] =[];
  public users:any[]=[];
  constructor() {
    this.start();
    this.connection.on("ReceiveMessage", (user:string , message:string , messageTime : string)=>{
      

      this.messages =[...this.messages , {user,message,messageTime}];
      this.messages$.next(this.messages);

    });
    this.connection.on("ConnectedUser" , (users:any)=>{
      this.connectedUsers$.next(users);
    })
  }
  public async start (){
    try {
      await this.connection.start()
      console.log("connection is establish");
    }
    catch (error){
      console.log(error);

    }
  }

  public async joinRoom(user :string , room : string){
    return this.connection.invoke("JoinRoom" , {user , room}) // this method in backend
  }


  public async sendMessage(message : string) {
    return this.connection.invoke("SendMessage" , message)
  }


  public async leaveChat(){
    return this.connection.stop()
  }
}
