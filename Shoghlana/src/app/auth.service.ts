import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { GoogleAuthData } from './Models/google-auth-data';
import { UserRoleServiceService } from './Services/UserRole/user-role-service.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private email: string = '';
  userdata = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private UserRoleService: UserRoleServiceService,
    private _router :Router
  ) {
// var token=localStorage.getItem('token')
//     if(token!==null){
//          this.decodeUserData();
         //when refresh he loggged out but with this condition we check if token still in local storage
        // we call decode again
  //   }
  }

  setEmail(email: string) {
    this.email = email;
  }

  decodeUserData() {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken); // Directly decode the token
      console.log(decodedToken);
      //this.userdata = decodedToken;
      this.userdata.next(decodedToken); //its behaviour subject (observer) so we use next not equal
    } else {
      console.error('Token not found in localStorage');
    }
  }

  getEmail(): string {
    return this.email;
  }
  register(userdata: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/Register`,
      userdata
    );
  }
  login(userdata: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/Auth/Token`, userdata);
  }
  logOut(){
    localStorage.removeItem('token');
    this.userdata.next(null);
    this._router.navigateByUrl('/signin');
  }

  ConfirmMail(toemail: string): Observable<any> {
    const url = `http://localhost:5092/api/Mail/SendConfirmationEmail?toemail=${toemail}`;
    console.log(toemail);
    return this._httpClient.post(url, {});
  }
  GoogleAuthentication(googleAuthData: GoogleAuthData): Observable<any> {
    googleAuthData.role = this.UserRoleService.get();
    return this._httpClient.post(
      environment.baseUrl + '/Auth/GoogleAuthentication',
      googleAuthData
    );
  }
  RefreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this._httpClient
      .post(`${environment.baseUrl}/Auth/refreshToken`, { refreshToken })
      .pipe(
        map((response: any) => {
          if (response.isSuccess && response.token && response.refreshToken) {
            this.storeTokens(response.token, response.refreshToken);
            return response.token;
          } else {
            throw new Error('Failed to refresh token');
          }
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
