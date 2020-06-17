import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CoreHttpService } from 'src/app/services/core-http.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseURL = environment.base_url;
    changepasswordURL = this.baseURL + '/api/changePassword';

    constructor(private httpService: CoreHttpService,private router:Router) {

    }

    login(data) {
      return this.httpService.httpPostRequest<any,any>(`${environment.base_url}/api/adminLogin`, { email:data.email, password:data.password,devicePlatform:data.devicePlatform,deviceToken:data.deviceToken,deviceUniqueId:data.deviceUniqueId,os:data.os,deviceModel:data.deviceModel })
          .pipe(map(user => {
              return user;
          }));
    }

    changeAdminPassword(data) {
      return this.httpService.httpPostRequest(this.changepasswordURL,data);
    }


}
