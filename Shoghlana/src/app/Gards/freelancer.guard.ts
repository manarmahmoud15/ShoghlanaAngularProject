import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn : 'root'
})
export class freelancerGuard{


  constructor(private router : Router ) {
    
  }

  canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean
  {

    if(localStorage.getItem('Role') === 'Freelancer')
      {
        return true;
      }
      else
      {
        this.router.navigateByUrl('/home')
        return false;
      }
  }
}
