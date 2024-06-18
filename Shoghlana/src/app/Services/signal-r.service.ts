import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { error } from 'console';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }
  hubConnection:signalR.HubConnection | undefined ;
  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.baseUrl}/notificationHub` , {
      skipNegotiation : true ,
      transport : signalR.HttpTransportType.WebSockets
    }).build();
    this.hubConnection.start().then(()=> {
      console.log('hub conntection started')
    })
    .catch(err => console.log('error ' + error))
  }
  askServer (){
    this.hubConnection?.invoke('askServer' , 'hey')
    .catch(err => console.error(err));
  }
  askServerListener()
  {
    this.hubConnection?.on('askServerResponse', (someText)=>{
      console.log(someText)
    } )
  }
}
