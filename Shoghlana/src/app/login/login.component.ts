import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
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
  constructor(private _authoService: AuthService, private _router: Router,
    private UserRoleService : UserRoleServiceService
  ) {}
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
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
}
