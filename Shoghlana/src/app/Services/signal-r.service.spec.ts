import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5092/notificationHub', {
        accessTokenFactory: () => {
          const token = localStorage.getItem('token');
          return token ? token : '';
        }
      })
      .build();
  }

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }

  addNotificationListener(callback: (data: any) => void): void {
    this.hubConnection.on('ReceiveNotification', callback);
  }

  stopConnection(): void {
    this.hubConnection.stop()
      .then(() => console.log('SignalR connection stopped'))
      .catch(err => console.error('Error while stopping SignalR connection: ' + err));
  }

  // For testing: Method to manually trigger a notification
  triggerNotification(message: string): void {
    this.hubConnection.invoke('SendNotificationToAll', message)
      .catch(err => console.error(err));
  }
}
