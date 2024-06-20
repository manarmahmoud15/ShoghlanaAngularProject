import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { GoogleAuthData } from './Models/google-auth-data';
import { UserRoleServiceService } from './Services/UserRole/user-role-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient,
     private UserRoleService : UserRoleServiceService) { }
   register(userdata:object):Observable<any>{
    return this._httpClient.post(`http://localhost:5092/api/Auth/Register`, userdata)
}
login(userdata:object):Observable<any>{

   return this._httpClient.post(`http://localhost:5092/api/Auth/Token`, userdata)
}

GoogleAuthentication(googleAuthData : GoogleAuthData) : Observable<any>
{
  googleAuthData.role = this.UserRoleService.get()
  return this._httpClient.post(environment.baseUrl + '/Auth/GoogleAuthentication' , googleAuthData)
}

// getToken():string{
// return  localStorage.getItem("token")? localStorage.getItem("token"):""
// }
}
