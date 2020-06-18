import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    const token = JSON.parse(localStorage.getItem('accesstoken'));
    if(token) {
      req = req.clone({
        headers:req.headers.set('httpx-thetatech-accesstoken',token) 
        // setHeaders: {
        //   'httpx-thetatech-accesstoken': `${JSON.parse(localStorage.getItem('accesstoken'))}`,
        //   //  'httpx-thetatech-accesstoken': token,
        //   //  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, access_token'
        // }
      });
    } else {
      return next.handle(req);
    }
    return next.handle(req);
  }
}
