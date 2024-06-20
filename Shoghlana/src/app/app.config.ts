import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors,HttpClientModule } from '@angular/common/http';
import { authinterceptors } from './Interceptors/auth-interceptor.service';
import { provideStore } from '@ngrx/store';
import { increaseCounter } from './Store/Counter/counter.action';
import { counterReducer } from './Store/Counter/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch(),
    withInterceptors([authinterceptors]))
    ,provideStore({
counter:counterReducer
    })]
  //ًwith fetch  عشان اشتغل ب fetch api NOT With httprequest
  //with interceptors  to use any interceptor in app when requesting data or response
  
};
