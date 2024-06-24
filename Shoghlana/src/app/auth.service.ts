import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { GoogleAuthData } from './Models/google-auth-data';
import { UserRoleServiceService } from './Services/UserRole/user-role-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private email: string = '';
  constructor(private _httpClient:HttpClient,
     private UserRoleService : UserRoleServiceService) { }

     setEmail(email: string) {
      this.email = email;
    }

    getEmail(): string {
      return this.email;
    }
   register(userdata:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/Auth/Register`, userdata)
}
login(userdata:object):Observable<any>{

   return this._httpClient.post(`${environment.baseUrl}/Auth/Token`, userdata)
}

ConfirmMail(toemail:string):Observable<any>{
  const url= `http://localhost:5092/api/Mail/SendConfirmationEmail?toemail=${toemail}`
  console.log(toemail);
return this._httpClient.post(url,{})
}
GoogleAuthentication(googleAuthData : GoogleAuthData) : Observable<any>
{
  googleAuthData.role = this.UserRoleService.get()
  return this._httpClient.post(environment.baseUrl + '/Auth/GoogleAuthentication' , googleAuthData)
}
RefreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  return this._httpClient.post(`${environment.baseUrl}/Auth/refreshToken`, { refreshToken }).pipe(
  map((response: any) => {
      if (response.isSuccess && response.token && response.refreshToken) {
        this.storeTokens(response.token, response.refreshToken);
        return response.token;
      } else {
        throw new Error('Failed to refresh token');
      }
    }),
    catchError(error => {
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
