// import { Component } from '@angular/core';
// import { SignalrService } from '../Services/signal-r.service.spec';

// @Component({
//   selector: 'app-notification',
//   standalone: true,
//   imports: [],
//   templateUrl: './notification.component.html',
//   styleUrl: './notification.component.css'
// })
// export class NotificationComponent {

//   title = 'signalr-angular-app';
//   notifications: any[] = [];

//   constructor(private signalrService: SignalrService) {}

//   ngOnInit(): void {
//     this.signalrService.startConnection();
//     this.signalrService.addNotificationListener((data: any) => {
//       this.notifications.push(data);
//     });
//   }

//   ngOnDestroy(): void {
//     this.signalrService.stopConnection();
//   }

//   // For testing: Method to manually send a notification
//   sendTestNotification(): void {
//     const testNotification = { message: 'Test Notification from Angular' };
//     this.signalrService.triggerNotification(testNotification);
//   }
// }
