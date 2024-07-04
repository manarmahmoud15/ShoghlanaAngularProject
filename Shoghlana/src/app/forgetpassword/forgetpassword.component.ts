

import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  validationErrors: any = {};

  constructor(private _router: Router) {}

  forgetPassword() {
    this.isSubmitting = true;
    this.authService.forgetPassword(this.email).subscribe({
      next: (response) => {
        console.log(response.isSuccess); // This should log true if isSuccess is true
        swal(response.message);
        this.token = response.token;
        console.log('token is:', this.token); // This should display the token
        this.showEmailsent = response.isSuccess;
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('response from error:', error);
        swal("Error!", error.message, "warning");
        this.showEmailsent = true;
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  resetPassword(resetForm: NgForm) {
    if (resetForm.invalid) {
      return;
    }

    if (!this.token) {
      swal("خطأ", "لم يتم العثور على رمز إعادة تعيين كلمة المرور. الرجاء المحاولة مجدداً.", "warning");
      return;
    }

    const resetFormData = {
      token: this.token,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.isSubmitting = true;
    this.authService.resetPassword(resetFormData).subscribe({
      next: (response) => {
        console.log(response.isSuccess);
        console.log('response from next:', response);
        swal("تم تغيير كلمة السر بنجاح");
        this.showEmailsent = response.isSuccess;
        this.isSubmitting = false;
        if (response.isSuccess) {
          this._router.navigateByUrl('/signin');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('response from error:', error);
        this.validationErrors = error.error.errors || {};
        swal("خطأ", "حاول مجددا", "warning");
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  getPasswordError() {
    if (this.validationErrors.Password) {
      return this.validationErrors.Password.join(', ');
    }
    return '';
  }

  getConfirmPasswordError() {
    if (this.validationErrors.ConfirmPassword) {
      return this.validationErrors.ConfirmPassword.join(', ');
    }
    return '';
  }

  getTokenError() {
    if (this.validationErrors.Token) {
      return this.validationErrors.Token.join(', ');
    }
    return '';
  }
}
