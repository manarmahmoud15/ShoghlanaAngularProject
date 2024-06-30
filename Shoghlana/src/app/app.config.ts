// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideHttpClient, withFetch, withInterceptors,HttpClientModule, HttpClient } from '@angular/common/http';
// import { authinterceptors } from './Interceptors/auth-interceptor.service';
// import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// import { provideStore } from '@ngrx/store';
// import { increaseCounter } from './Store/Counter/counter.action';
// import { counterReducer } from './Store/Counter/counter.reducer';
// import { refreshTokenInterceptor } from './Interceptors/refreshtoken';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
// }
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch(),
//     withInterceptors([refreshTokenInterceptor]) ,
//     importProvidersFrom(
//       TranslateModule.forRoot({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient],
//         },
//       })
//     ),
//     // withInterceptors([authinterceptors]
//     )
//     ,provideStore({
// counter:counterReducer
//     })
//   //ًwith fetch  عشان اشتغل ب fetch api NOT With httprequest
//   //with interceptors  to use any interceptor in app when requesting data or response
// , {
//   provide: 'SocialAuthServiceConfig',
//   useValue: {
//     autoLogin: false,
//     lang: 'en',
//     providers: [
//       {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider(
//           '1679541546-jcmb01tm980bmijbjth4e3v7hp1bto31.apps.googleusercontent.com',
//           {
//             oneTapEnabled : false,
//             prompt : 'consent'
//           }
//         ),

//       },
//     ],
//     onError: (err) => {
//       console.error(err);
//     }
//   } as SocialAuthServiceConfig,
// }]

// }

// function provideAnimationsAsync():
//   | import('@angular/core').Provider
//   | import('@angular/core').EnvironmentProviders {
//   throw new Error('Function not implemented.');
// }
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, HttpClientModule, HttpClient } from '@angular/common/http';
import { authinterceptors } from './Interceptors/auth-interceptor.service';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './Store/Counter/counter.reducer';
import { refreshTokenInterceptor } from './Interceptors/refreshtoken';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function for the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([refreshTokenInterceptor, authinterceptors])
    ),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideStore({
      counter: counterReducer
    }),
    {
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
                oneTapEnabled: false,
                prompt: 'consent'
              }
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};

function provideAnimationsAsync():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
