import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges , OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { error, log } from 'console';
import { Router } from '@angular/router';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleAuthData } from '../Models/google-auth-data';
import { RoleSelectionPopupComponent } from "../role-selection-popup/role-selection-popup.component";
import { UserRole } from '../Enums/UserRole';
import { UserRoleServiceService } from '../Services/UserRole/user-role-service.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [CommonModule, FormsModule , ReactiveFormsModule, HttpClientModule, GoogleSigninButtonModule, RoleSelectionPopupComponent]
})
export class RegisterComponent implements OnInit {
  isLoading:boolean=false;
  apiError:string=''
  RegisterForm: FormGroup;
  googleAuthData : GoogleAuthData = {} as GoogleAuthData
  UserRole : number = {} as number
  constructor(private _authoService: AuthService, private _router: Router,
    private SocialAuthService : SocialAuthService,
    private UserroleService : UserRoleServiceService
  ) {
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

  ngOnInit(): void {
    this.UserRole = this.UserroleService.get();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.SocialAuthService.authState.subscribe({
      next : (result) => {
        console.log(result);
        console.log("role before adding to google obj" + this.UserRole)
        // this.googleAuthData = result
        this.googleAuthData.email = result.email
        this.googleAuthData.firstName = result.firstName
        this.googleAuthData.id = result.id
        this.googleAuthData.idToken = result.idToken
        this.googleAuthData.name = result.name
        this.googleAuthData.photoUrl = result.photoUrl
      //  this.googleAuthData.role = this.UserRole

        console.log( "role in google obj google" + this.googleAuthData.role)

        console.log(this.googleAuthData);

      this._authoService.GoogleAuthentication(this.googleAuthData).subscribe({
        next : (res) => {console.log(res);
          if(res.isSuccess)
            {
              localStorage.setItem("UserToken" , res.data.token)
              this._router.navigateByUrl("/home")
            }
        },
        error : (err) => {console.log(err)}
      })
    },
    error : (err) => {
      console.log(err);
    },
    complete : () => {
      console.log("Completed");
    }
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


  OnRoleSelected(role : string)
  {
     console.log(role);
  }
}
