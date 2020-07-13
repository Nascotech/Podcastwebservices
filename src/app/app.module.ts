import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { FullWidthModule } from './layouts/full-width/full-width.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from './core/core.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ServicesModule } from './services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { PublishersModule } from './modules/publishers/publishers.module';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';
import { AuthGuard } from './core/guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullWidthModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ToastrModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    ServicesModule,
    PublishersModule,
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions> {
      // rootMargin must be specified in pixels or percent
      rootMargin: '30px',
      threshold: 0.1,
      // css filter
      filter: 'blur(3px) drop-shadow(0 0 0.75rem crimson)',
      // image width / height ratio for image holder
      imageRatio: 16 / 9,
      // loading image in placeholder. Can be URL or base64
      placeholderImageSrc:
      // tslint:disable-next-line:max-line-length
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
