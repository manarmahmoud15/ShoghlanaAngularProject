import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 let _AuthService= inject(AuthService);
 let router= inject(Router)
//  if(_AuthService.register()){
//    return true;
//  }else{
//  router.navigateByUrl('/signin')
//  }
  return true;
};
