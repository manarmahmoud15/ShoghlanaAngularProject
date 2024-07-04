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
  constructor(private _authoService: AuthService, private _router: Router) {}
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
          if (response.isSuccess) {
            localStorage.setItem('token', response.token);
            localStorage.setItem("Id",response.data.id)
            this._authoService.decodeUserData();
            this._authoService.userdata.next(response.data)  // navbar keep track for changes
            this.isLoading = false;
            this._router.navigateByUrl('/home');
          }
          else
          {
            this.isLoading = false;
            this.apiError = response.message;
            this.resetForm();
           // alert(this.apiError);
          }
        },
        error: (error) => {
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
