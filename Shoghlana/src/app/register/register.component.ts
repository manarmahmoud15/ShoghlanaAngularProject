import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading:boolean=false;
  apiError:string=''
  RegisterForm: FormGroup;
  constructor(private _authoService: AuthService, private _router: Router) {
    this.RegisterForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      repeatPassword: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      // phoneNumbers:new FormArray([new FormControl('')])
    });
  }
//   get Phones(){
//    return this.RegisterForm.get("phoneNumbers") as FormArray
//   }
//   addnewphone(){
// this.Phones.push(new FormControl(''))
//   }
  handleRegister(RegisterForm: FormGroup) {
    this.isLoading=true;
    if (RegisterForm.valid) {
      console.log(RegisterForm.value);
      this._authoService.register(RegisterForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.isLoading=false
            this._router.navigateByUrl("/signin")
          }
        },
        error: (error) => {
          this.isLoading=false
          this.apiError=error.error.errors
          alert(this.apiError)

        }
      });
    }
  }
}
