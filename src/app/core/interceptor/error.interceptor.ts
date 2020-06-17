import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor( private router: Router, private toastr: ToastrService) { }

intercept(request: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
  return next.handle(request).pipe(catchError(err => {
    if (err.status === 401) {


      this.toastr.error('Your session has beed expired.');
      this.router.navigate(['login']);
    }
    const error = err.error || err.statusText;
    return throwError(error);
  }));
}
}
