import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
RegisterForm:FormGroup= new FormGroup({
  name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  email: new FormControl (null,[Validators.required, Validators.email]),
  password: new FormControl (null,[Validators.required,  Validators.pattern(/^(?=.*\d{3,})[A-Za-z\d]{5,}$/)]),
  rePassword: new FormControl(null,[Validators.required,  Validators.pattern(/^(?=.*\d{3,})[A-Za-z\d]{5,}$/)]),
  phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

})
handleRegister(RegisterForm:FormGroup){
console.log(RegisterForm);
}
  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z][0-9]{3}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  handleRegister(RegisterForm: FormGroup) {
    console.log(RegisterForm);
  }
}
