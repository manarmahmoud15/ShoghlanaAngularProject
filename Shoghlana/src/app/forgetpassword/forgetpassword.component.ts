// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from '../auth.service';
// import { error } from 'console';
// import { HttpErrorResponse } from '@angular/common/http';
// import { MatCommonModule } from '@angular/material/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-forgetpassword',
//   standalone: true,
//   imports: [FormsModule, MatCommonModule, CommonModule],
//   templateUrl: './forgetpassword.component.html',
//   styleUrls: ['./forgetpassword.component.css'],
// })
// export class ForgetpasswordComponent {
//   email!: string;
//   authService = inject(AuthService);
//   matSnackBar = inject(MatSnackBar);
//   showEmailsent= false;
//   isSubmitting=false;
//   constructor() {}
//   forgetPassword() {
//     this.isSubmitting=true;
//     this.authService.forgetPasswod(this.email).subscribe({
//       next: (response) => {
//         if (response.isSuccess) {
//           this.matSnackBar.open(response.message, 'close', { duration: 5000 });
//           this.showEmailsent=true;
//         }
//         else{
//           this.matSnackBar.open(response.message, 'close', { duration: 5000 });
//           this.showEmailsent=true;
//         }
//       },
//     error:(error:HttpErrorResponse)=>{
//       this.matSnackBar.open(error.message, 'close', { duration: 5000 });
//       this.showEmailsent=true;
//     },
//     complete:()=>{
//       this.isSubmitting=false;
//     }
//     });
//   }
// }
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [FormsModule, MatCommonModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  email!: string;
  password!: string;
  confirmPassword!: string;
  token!: string;

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  showEmailsent = false;
  isSubmitting = false;

  constructor(private _router: Router) {}

  forgetPassword() {
    this.isSubmitting = true;
    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        console.log(response.isSuccess); // This should log true if isSuccess is true
        //console.log('response from next:', response); // This will properly display the response object
        swal(response.message, "info");
        this.token = response.token;
        console.log('token is:', this.token); // This should display the token
        this.showEmailsent = response.isSuccess;
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('response from error:', error);
        // alert(error.message);
        swal("error!", error.message, "warrning");
        this.showEmailsent = true;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
  resetPassword() {
    const resetForm = {
      token: this.token,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.isSubmitting = true;
    this.authService.resetPassword(resetForm).subscribe({
      next: (response) => {
        console.log(response.isSuccess);
        console.log('response from next:', response);
        // alert(response.message);
        this.showEmailsent = response.isSuccess;
        this.isSubmitting = false;
        if (response.isSuccess) {
          swal("تم تغيير كلمة السر بنجاح");
          this._router.navigateByUrl('/login');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('response from error:', error);
        // alert(error.message);
        swal("خطأ", "حاول مجددا", "warning");

        this.showEmailsent = true;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
