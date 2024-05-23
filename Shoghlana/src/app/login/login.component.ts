import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
    templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm:FormGroup= new FormGroup({
    email: new FormControl (null,[Validators.required, Validators.email]),
    password: new FormControl (null,[Validators.required,  Validators.pattern(/^(?=.*\d{3,})[A-Za-z\d]{5,}$/)]),
  })
    handleRegister(RegisterForm: FormGroup) {
      console.log(RegisterForm);
    }
}
