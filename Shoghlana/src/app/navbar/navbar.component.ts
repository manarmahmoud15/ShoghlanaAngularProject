import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../Services/chat/chat.service';
import { AuthService } from '../auth.service';
import { DarkModeService } from '../Services/DarkMode/dark-mode.service';
import { data } from 'jquery';
import { NotificationService } from '../Services/Notification/notification.service';
import { INotification } from '../Models/INotification';
import { NotificationReason } from '../Enums/Notification-Reason';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers : [DatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  darkModeService : DarkModeService = inject(DarkModeService);
  toggleDarkMode(){
    this.darkModeService.updateDarkMode()
  }



isLogged : boolean = true;
 Id! : Number
 isFreelancer : boolean = false
 isClient : boolean = false
 Notifications! : INotification[] 
 NotificationReason = NotificationReason
 IsOpenPopUp : boolean = false
 NewNotificationsCounter! : number

 logOut(){
    this._authService.logOut();
  }

  constructor(private _authService: AuthService,
     private _notificationService : NotificationService, private DatePipe : DatePipe,
    private router : Router) {
    //using behavoir subject this code works with every change in dom
    
   
  }
  isOpen = false;
  messages: any;
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  ChatService = inject(ChatService);
  // loggedInUserName = sessionStorage.getItem("user");
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }
  ngOnInit(): void {
    
    if(localStorage.getItem('token'))
      {
        console.log('logging')
        this.isLogged = true
        this.NewNotificationsCounter = this._notificationService.getUnReadNotificationsCount();

        if(localStorage.getItem('Id'))
        {
          this.Id = Number (localStorage.getItem('Id'))
        }
      }
      else
      {
        console.log('Not logging')
        this.isLogged = false;
      }
      console.log( 'is logged' + this.isLogged)
      console.log(this._authService.userdata)
  
    
    this._authService.userdata.subscribe({
      next: () => {
        if (this._authService.userdata.getValue() !== null) {
          this.isLogged = true;
          this.NewNotificationsCounter = this._notificationService.getUnReadNotificationsCount();
          console.log(this.NewNotificationsCounter)

          // if(typeof localStorage !== 'undefined')
          // {
          //   if(localStorage.getItem('Role') === 'Client')
          //     {
          //       this._notificationService.GetByClientId(this.Id).subscribe({
          //         next : (res) => {
          //             console.log(res)
          //             if(res.isSuccess)
          //             {
          //                   this.Notifications = res.data;
          //                   this.NewNotificationsCounter = this.Notifications.length 
          //                   console.log(this.Notifications) 
          //                 //  this.NewNotificationsCount() 
          //             }
          //             else
          //             {
          //               console.log(res.message)
          //             }
          //         },
          //         error : (err) => {
          //           console.log(err)
          //         }
          //       });
          //     }
    
          //     else if(localStorage.getItem('Role') === 'Freelancer')
          //     {
          //       this._notificationService.GetByFreelancerId(this.Id).subscribe({
          //         next : (res) => {
          //             console.log(res)
          //             if(res.isSuccess)
          //             {
          //                   this.Notifications = res.data;
          //                   this.NewNotificationsCounter = this.Notifications.length 
          //                   console.log(this.Notifications) 
          //               //    this.NewNotificationsCount() 
          //             }
          //             else
          //             {
          //               console.log(res.message)
          //             }
          //         },
          //         error : (err) => {
          //           console.log(err)
          //         }
          //       });
          //     }
          // }
         



        } else {
          this.isLogged = false; 
        }
      },
    });

    this._authService.Id.subscribe({
      next : () => {
        if(this._authService.Id.getValue() !== null)
          {
            this.Id = Number (this._authService.Id.getValue())  // test
            console.log('id from navbar ' + this.Id)
          }
      }
    })

    this._authService.IsClient.subscribe({
      next : () => {
        if(this._authService.IsClient.getValue() !== null)
          {
              this.isClient = true
              console.log(this._authService.IsClient.getValue()) 
          }
          else
          {
            this.isClient = false
            console.log(this._authService.IsClient.getValue()) 
          }
      }
    })

    this._authService.IsFreelancer.subscribe({
      next : () => {
        if(this._authService.IsFreelancer.getValue() !== null)
          {
              this.isFreelancer = true
              console.log(this._authService.IsFreelancer.getValue()) 
          }
          else
          {
            this.isFreelancer = false
            console.log(this._authService.IsFreelancer.getValue()) 
          }
      }
    })

  //  this.Id = this._authService.getId()
  //  console.log("id from navbar" + this.Id)

  // if (localStorage.getItem('Role'))
  //   {
  //     this.roles.push(String (localStorage.getItem('Role')))

  //     if(this.roles[0] === 'Client')
  //       {
  //         this.isClient = true
  //         console.log(this.roles[0]) 
  //       }
  //       else if(this.roles[0] === 'Freelancer')
  //       {
  //          this.isFreelancer = true
  //         console.log(this.roles[0]) 
  //       }

  //       console.log('is freelancer' + this.isFreelancer)
  //       console.log('is client' + this.isClient)
  //   }
   
    this.ChatService.messages$.subscribe(res=>{

      this.messages = res;
      console.log(this.messages);
    });

  }

  // NewNotificationsCount() 
  // {
  //   if(this.Notifications !== undefined)
  //   {
  //     this.NewNotificationsCounter = this.Notifications.filter(n => n.isRead === false).length
  //     console.log(this.Notifications.filter(n => n.isRead === false))
  //   }
  // }

  GetNotifications()  // called with each click >> get latest notifications >> signalr simulation
  {
     if(typeof localStorage !== 'undefined')
          {
            if(localStorage.getItem('Role') === 'Client')
              {
                this._notificationService.GetByClientId(this.Id).subscribe({
                  next : (res) => {
                      console.log(res)
                      if(res.isSuccess)
                      {
                            this.Notifications = res.data;
                           // this.NewNotificationsCounter = this.Notifications.length 
                            console.log(this.Notifications) 
                          //  this.NewNotificationsCount() 
                      }
                      else
                      {
                        console.log(res.message)
                      }
                  },
                  error : (err) => {
                    console.log(err)
                  }
                });
              }
    
              else if(localStorage.getItem('Role') === 'Freelancer')
              {
                this._notificationService.GetByFreelancerId(this.Id).subscribe({
                  next : (res) => {
                      console.log(res)
                      if(res.isSuccess)
                      {
                            this.Notifications = res.data;
                           // this.NewNotificationsCounter = this.Notifications.length 
                            console.log(this.Notifications) 
                        //    this.NewNotificationsCount() 
                      }
                      else
                      {
                        console.log(res.message)
                      }
                  },
                  error : (err) => {
                    console.log(err)
                  }
                });
              }
          }   
          this.MarkNotificationsAsRead()
  }

  MarkNotificationsAsRead()
  {
    this._notificationService.setUnReadNotificationsCount(0);
    this.NewNotificationsCounter = this._notificationService.getUnReadNotificationsCount();
  }

  FormatTime(Time : string) : string 
  {
      return this.DatePipe.transform(Time , 'medium')?? ''
  }

  Navigate(id : Number) : void
  {
    const TempNotification = this.Notifications.find(n => n.id === id)
    if(!TempNotification)
    {
      return;
    }

    switch(TempNotification.reason)
    {
      case this.NotificationReason.Welcome:
          this.router.navigateByUrl('/home'); 
          this.IsOpenPopUp = false; 
        break;
      case this.NotificationReason.AcceptedProposal:
        this.router.navigate(['/project-details',TempNotification.notificationTriggerId]);  
        this.IsOpenPopUp = false; 
        this.NewNotificationsCounter = 0
        break;
      case this.NotificationReason.RejectedProposal:
        this.router.navigate(['/project-details',TempNotification.notificationTriggerId]); 
        this.IsOpenPopUp = false; 
      break;
      case this.NotificationReason.NewProposalAdded:
        this.router.navigate(['/project-details',TempNotification.notificationTriggerId]);  
        this.IsOpenPopUp = false; 
      break;
    }
  }
}
