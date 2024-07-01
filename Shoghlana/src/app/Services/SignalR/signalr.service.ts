import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
@Injectable({
  providedIn: 'root'
})
export class SignalrService {

   hubConnection : signalR.HubConnection | undefined ;

    startConntection =()=>{
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5092/individualChatHub', {
        skipNegotiation : true,
        transport:signalR.HttpTransportType.WebSockets
      }).build();

      this.hubConnection.start().then(()=>{
        console.log('Hub Connection Started!');
      }).catch(err=> console.log('Error While Starting Connection' + err))
    }

    askServer(){
      this.hubConnection?.invoke("askServer" , "hey").catch(err=>{console.error(err)})
    }
    askServerListener(){
      this.hubConnection?.on("askServerResponse" , (someText) =>{
        console.log(someText);
      })
    }
}
