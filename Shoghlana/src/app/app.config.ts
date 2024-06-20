import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors,HttpClientModule } from '@angular/common/http';
import { authinterceptors } from './Interceptors/auth-interceptor.service';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([authinterceptors]))
, {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    lang: 'en',
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '1679541546-jcmb01tm980bmijbjth4e3v7hp1bto31.apps.googleusercontent.com',
          {
            oneTapEnabled : false,
            prompt : 'consent'
          }
        ),
      
      },
    ],
    onError: (err) => {
      console.error(err);
    }
  } as SocialAuthServiceConfig,
}]
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
