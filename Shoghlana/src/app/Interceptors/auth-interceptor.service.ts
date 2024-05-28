import {HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function authinterceptors(req:HttpRequest<any>, next:HttpHandlerFn)
{
  console.log(req);
  return next(req)

}
