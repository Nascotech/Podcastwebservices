import { Injectable } from '@angular/core';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';
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
    forgotpasswordURL = this.baseURL + '/api/forgotPassword';
    checkresettokenURL = this.baseURL + '/api/checkResetToken';
    resetpasswordURL = this.baseURL + '/api/resetPassword';
    settingsvaluesURL = this.baseURL + '/api/defaultConfig';
    savesettingskeysURL = this.baseURL + '/api/defaultConfig';
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

    forgotPassword(data){
      return this.httpService.httpPostRequest(this.forgotpasswordURL,data);
    }

    checkResetToken(resetToken) {
      return this.httpService.httpPostRequest(this.checkresettokenURL, {
        passwordResetToken: resetToken,
      });
    }

    resetPassword(data, resetToken) {
      return this.httpService.httpPostRequest(this.resetpasswordURL, {
        passwordResetToken: resetToken,
        newPassword : data.password,
        confirmPassword: data.confirmPassword
      });
    }


    logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accesstoken');
  }

    getSettingskeys()
    {
      return this.httpService.httpGetRequest(this.settingsvaluesURL);
    }


  saveSettingsKeys(data)
  {
    return this.httpService.httpPostRequest(this.savesettingskeysURL,data)
  }


}
