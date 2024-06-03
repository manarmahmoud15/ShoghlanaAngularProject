import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors,HttpClientModule } from '@angular/common/http';
import { authinterceptors } from './Interceptors/auth-interceptor.service';
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([authinterceptors]))]
  //ًwith fetch  عشان اشتغل ب fetch api NOT With httprequest
  //with interceptors  to use any interceptor in app when requesting data or response
};
