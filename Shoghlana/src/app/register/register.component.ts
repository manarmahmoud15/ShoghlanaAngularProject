import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges , OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { error, log } from 'console';
import { Router } from '@angular/router';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleAuthData } from '../Models/google-auth-data';
import { RoleSelectionPopupComponent } from "../role-selection-popup/role-selection-popup.component";
import { UserRole } from '../Enums/UserRole';
import { UserRoleServiceService } from '../Services/UserRole/user-role-service.service';
import swal from 'sweetalert';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl:'./register.component.html',
    styleUrl: './register.component.css',
    imports: [TranslateModule,CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, GoogleSigninButtonModule, RoleSelectionPopupComponent]
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;
  apiError:string=''
  RegisterForm: FormGroup;
  googleAuthData : GoogleAuthData | null = {} as GoogleAuthData
  UserRole : number = {} as number
  email: string = '';
  showModal2: boolean = false;
  private authStateSubscription! : Subscription

  constructor(private _authoService: AuthService, private _router: Router,
    private SocialAuthService : SocialAuthService,
    private UserroleService : UserRoleServiceService,
    private __translateService: TranslateService

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
      role : new FormControl(this.UserroleService.get())
      // phoneNumbers:new FormArray([new FormControl('')])
    });
    const lang = localStorage.getItem('language') || 'en';
    this.__translateService.setDefaultLang(lang);
    this.__translateService.use(lang);
  }

  ngOnInit(): void {
    this.UserRole = this.UserroleService.get();
    // console.log(this.UserRole)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("hello from external auth func")
    this.authStateSubscription = this.SocialAuthService.authState.subscribe({
      next : (result) => {
        console.log(result);
        console.log("role before adding to google obj" + this.UserRole)
        // this.googleAuthData = result
        if(this.googleAuthData)
          {
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
                  localStorage.setItem("token" , res.data.token)
                  console.log("client id from backend" + res.data.id)
                  localStorage.setItem("Id",res.data.id)
                  localStorage.setItem("Role",res.data.roles)
                  this._authoService.userdata.next(res.data);
        console.log(this._authoService.userdata)   // here 
                  console.log(localStorage.getItem("Id"));
                  this._router.navigateByUrl("/home")
                }
                this.clearAuthState()
            },
            error : (err) => {console.log(err)
              this.clearAuthState();
            },
            complete : () => {this.clearAuthState()}
          })
          }
        
    },
    error : (err) => {
      console.log(err);
    },
    complete : () => {
      console.log("Completed");
    }
    });
   
   // alert("hello from register")
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.clearAuthState()
  }
//   get Phones(){
//    return this.RegisterForm.get("phoneNumbers") as FormArray
//   }
//   addnewphone(){
// this.Phones.push(new FormControl(''))
//   }
confirm() {
  const toemail = this.email; // Ensure this.email is correctly populated with the email address
  console.log(toemail);
  this._authoService.ConfirmMail(toemail).subscribe({
    next: (response) => {
      console.log(response)
      console.log(response.isSuccess);
      if (response.isSuccess) {
        window.open(`https://mail.google.com/mail/u/0/#inbox=${toemail}`, '_blank');
        this._router.navigateByUrl("/signin");
      }
    },
    error: (error) => {
      alert(`Error sending confirmation email: ${error}`)
    }
  });
}

  handleRegister(RegisterForm: FormGroup) {
    this.isLoading=true;
    if (RegisterForm.valid) {
      console.log(RegisterForm.value);
      this._authoService.register(RegisterForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.isLoading=false
            this.email = RegisterForm.value.email;
            console.log(this.email);

           swal({

            text:" هل تريد تأكيد تسجيل حسابك ؟ ",
            buttons: {
              confirm: {
                  text: "تأكيد",
                  value: true,
                  visible: true,
                  className: "btn-success",
                  closeModal: true,
              },
              cancel: {
                  text: "إلغاء",
                  value: null,
                  visible: true,
                  className: "btn-danger",
                  closeModal: true,
              }
          }
          }).then((value) => {
            if (value) {
              this.confirm();    // Handle confirmation button click
            } else {
                // Handle cancel button click or click outside the modal
                // Optional: You can omit this part if not needed

            }
        });
          }
          else
          {
            this.isLoading=false
            this.apiError=response.message
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


  // externalAuthentication() : void
  // {
  //   console.log("hello from external auth func")
  //       this.authStateSubscription = this.SocialAuthService.authState.subscribe({
  //         next : (result) => {
  //           console.log(result);
  //           console.log("role before adding to google obj" + this.UserRole)
  //           // this.googleAuthData = result
  //           if(this.googleAuthData)
  //             {
  //               this.googleAuthData.email = result.email
  //               this.googleAuthData.firstName = result.firstName
  //               this.googleAuthData.id = result.id
  //               this.googleAuthData.idToken = result.idToken
  //               this.googleAuthData.name = result.name
  //               this.googleAuthData.photoUrl = result.photoUrl
  //             //  this.googleAuthData.role = this.UserRole
        
  //               console.log( "role in google obj google" + this.googleAuthData.role)
        
  //               console.log(this.googleAuthData);
        
  //             this._authoService.GoogleAuthentication(this.googleAuthData).subscribe({
  //               next : (res) => {console.log(res);
  //                 if(res.isSuccess)
  //                   {
  //                     localStorage.setItem("token" , res.data.token)
  //                     console.log("client id from backend" + res.data.id)
  //                     localStorage.setItem("Id",res.data.id)
  //                     this._authoService.userdata.next(res.data);
  //           console.log(this._authoService.userdata)   // here 
  //                     console.log(localStorage.getItem("Id"));
  //                     this._router.navigateByUrl("/home")
  //                   }
  //                   this.clearAuthState()
  //               },
  //               error : (err) => {console.log(err)
  //                 this.clearAuthState();
  //               },
  //               complete : () => {this.clearAuthState()}
  //             })
  //             }
            
  //       },
  //       error : (err) => {
  //         console.log(err);
  //       },
  //       complete : () => {
  //         console.log("Completed");
  //       }
  //       });
    
 // }

  private clearAuthState(): void {
    this.googleAuthData = null;
    // Unsubscribe from the authState observable
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
