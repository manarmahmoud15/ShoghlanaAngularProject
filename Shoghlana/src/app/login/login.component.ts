import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserRoleServiceService } from '../Services/UserRole/user-role-service.service';
import { IndividualchatService } from '../Services/individualChat/individualchat.service';
import { User } from '../Models/user';
import { NotificationService } from '../Services/Notification/notification.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  apiError: string = '';
  visitedJobClientId! : Number;
  proposalID :any ;
  freelancerId : any;
  freelancerName : any;
  freelancerDetails : any[] =[];
  apiErrorMessage: string[] = [];
  openChat = false;
  JobId! : Number
  LoggedInId : Number = Number (localStorage.getItem('Id'));
  constructor(private _authoService: AuthService, private _router: Router,
    private UserRoleService : UserRoleServiceService ,
    private _individualChatService : IndividualchatService ,
    private _notificationService : NotificationService

  ) {}
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  chat(freelancerName : string){ 

    const user: User = { name: freelancerName };
      this._individualChatService.registerUser(user).subscribe({
        next:()=> {
          this._individualChatService.myName = user
          console.log('myname',this._individualChatService.myName)
          // this.openChat =true
        },
        error: err=>{
          if(typeof(err.error) !== 'object'){
            this.apiErrorMessage.push(err.error)
          }
        }
      })
  }
  handleLogin(LoginForm: FormGroup) {
    this.isLoading = true;
    if (LoginForm.valid) {
      console.log(LoginForm.value);
      this._authoService.login(LoginForm.value).subscribe({
        next: (response) => {
          console.log('this is response ', response);

          if (response.isSuccess) 
            {
            this._authoService.logOut();  // if user tried to navigate to signin via url >> allowed >> if try to login using another account while he is already logged in >> make logout first to avoid conflicts 
            localStorage.setItem('token', response.token);
            localStorage.setItem("Id",response.data.id);
            localStorage.setItem("Name",response.data.username); 
            this._notificationService.setUnReadNotificationsCount(response.data.unReadNotificationsNum)
            // console.log(this._authoService.getUnReadNotificationsCount());
            if(localStorage.getItem('Id'))
              {
                const id : any = Number (localStorage.getItem('Id'))
                this._authoService.Id.next(id)
              }
            localStorage.setItem("Role",response.data.roles)

            if (localStorage.getItem('Role') === 'Client')
              {
                 const role : any = 'Client'
                 this._authoService.IsClient.next(role)
              } 

              else if (localStorage.getItem('Role') === 'Freelancer')
                {
                   const role : any = 'Freelancer'
                   this._authoService.IsFreelancer.next(role)
                } 
            this._authoService.decodeUserData();
            this._authoService.userdata.next(response.data)  // navbar keep track for changes
            this.isLoading = false;
            this._router.navigateByUrl('/home');
            this.UserRoleService.set(null);  
          }
          else
          {
            this.isLoading = false;
            this.apiError = response.message;
            this.resetForm();
           // alert(this.apiError);
          }
        },
        error: (error: { error: { errors: string; }; }) => {
          this.isLoading = false;
          this.apiError = error.error.errors;
          this.resetForm();
         // alert(this.apiError);
        },
      });
    }
  }
  resetForm() {
    this.LoginForm.reset();
    this.apiError = ''; // Clear the API error message
  }

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   console.log(localStorage.getItem('Name'));
  // }
}
