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
  private roles : string[] = [] 
  // isFreelancer : boolean = false
  // isClient : boolean = false

  IsFreelancer = new BehaviorSubject(null);
  IsClient = new BehaviorSubject(null);
  userdata = new BehaviorSubject(null);
  // Id: any;
  Id = new BehaviorSubject(null);
  constructor(
  // id = new BehaviorSubject(null);
  // Id = new BehaviorSubject(null),
    private _httpClient: HttpClient,
    private UserRoleService: UserRoleServiceService,
    private _router: Router
  ) {

    if(typeof localStorage !== 'undefined')
      {
        if(localStorage.getItem('token'))
          {
            this.decodeUserData()  // user data will not be assigned to null
    
            const id : any = localStorage.getItem('Id');
            this.Id.next(id)
            if(localStorage.getItem('Role') === 'Freelancer')
              {
                 const role : any = 'Freelancer'
                 this.IsFreelancer.next(role);
              }
              else
              {
                this.IsFreelancer.next(null);
              }
    
              if(localStorage.getItem('Role') === 'Client')
                {
                   const role : any = 'Client'
                   this.IsClient.next(role);
                }
                else
                {
                  this.IsClient.next(null);
                }
          }
      }
   
    // var token=localStorage.getItem('token')
    //     if(token!==null){
    //          this.decodeUserData();
    //          //when refresh he loggged out but with this condition we check if token still in local storage
    //         // we call decode again
    //     }
  }
forgetPassword(email: string): Observable<any> {
  const url = `http://localhost:5092/api/Auth/forgot-password?email=${email}`;
  console.log(email);
  return this._httpClient.post(url, {});
}
resetPassword(resetform:any):Observable<any>{
  return this._httpClient
      .post(`${environment.baseUrl}/Auth/reset-password`, resetform )
}
  GetRole() : string
  {
if (localStorage.getItem('Role'))
    {
      this.roles.push(String (localStorage.getItem('Role')))

      return this.roles[0];
      // if(this.roles[0] === 'Client')
      //   {
      //     this.isClient = true
      //     console.log(this.roles[0]) 
      //   }
      //   else if(this.roles[0] === 'Freelancer')
      //   {
      //      this.isFreelancer = true
      //     console.log(this.roles[0]) 
      //   }

      //   else
      //   {
      //     this.isFreelancer = false;
      //     this.isClient = false;
      //   }
      //   console.log('is freelancer' + this.isFreelancer)
      //   console.log('is client' + this.isClient)
    }
  return 'No roles'
  }
  setEmail(email: string) {
    this.email = email;
  }
  decodeUserData() {
    console.log('hello from decode func')
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken); // Directly decode the token
      console.log('we have decoded token' +decodedToken);
      //this.userdata = decodedToken;
      this.userdata.next(decodedToken); //its behaviour subject (observer) so we use next not equal
    } else {
      console.error('Token not found in localStorage');
    }
  }

  getEmail(): string {
    return this.email;
  }

  register(userdata: any): Observable<any> {
    console.log(userdata);
    userdata.role = this.UserRoleService.get();
    console.log(userdata);

    return this._httpClient.post(
      `${environment.baseUrl}/Auth/Register`,
      userdata
    );
  }
  login(userdata: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/Auth/Token`, userdata);
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('Id');
    localStorage.removeItem('Role');
    localStorage.removeItem('Name');

    this._router.navigateByUrl('/signin');
    this.userdata.next(null);

    console.log(this.userdata)

    this.IsFreelancer.next(null);
    this.IsClient.next(null);
    this.Id.next(null);
    // console.log(this.IsClient)
    // console.log(this.userdata) 

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


//   CheckIfLoggedin()

  // getId() : Number | null   // set in local storage after successful login
  // {
  //   if (typeof localStorage !== 'undefined')
  //     {
  //       return (Number (localStorage.getItem('Id'))) 
  //     }
  //     return null
  // }

//   CheckIfLoggedin() 
// {
//   if(localStorage.getItem('Id'))
//     {
//       return true
//     }
//     else
//     {
//       return false
//     }
// }

}
