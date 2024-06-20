import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// private _snackbar :MatSnackBar
import { Observable } from "rxjs";
"@angular"
@Injectable()
export class  Refreshtoken implements HttpInterceptor {
  constructor(private inject:Injector,private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error("Method not implemented.");
  }
}
