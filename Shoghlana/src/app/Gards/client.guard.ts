import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { promises } from 'dns';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class clientGuard{

constructor(private router : Router) {
  
}

canActivate(route : ActivatedRouteSnapshot ,
  state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean
{
  if(localStorage.getItem('Role') === 'Client')
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

