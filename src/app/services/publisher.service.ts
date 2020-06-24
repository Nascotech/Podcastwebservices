
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CoreHttpService } from './core-http.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private baseURL = environment.base_url;
   getPublisherURL = this.baseURL + '/api/publisher';
   savePublisherURL = this.baseURL + '/api/publisher';
   removePublisherURL = this.baseURL + '/api/removePublisher/';
   editPublisherURL = this.baseURL + '/api/publisher';

  constructor(private commonService:CommonService,
    private corehttpService:CoreHttpService,
    private http: HttpClient){}

  getPublisherlist(pageNumber, size, keyWord, pagination = 1):Observable<any> {
    return this.corehttpService.httpGetRequest<any>(this.getPublisherURL + '?pageNo=' +pageNumber + '&pageSize=' +size + '&keyword=' +keyWord + '&isPagination=' +pagination);
  }

  // savePublisher(data,image):Observable<any>{
  //   data.append('image',image);
  //   console.log(data);

  //   return this.corehttpService.httpPostRequest(this.savePublisherURL,data)
  // }

  // savePublisher(data, image) {
  //   const frmData = new FormData();
  //   frmData.append('image', image);
  //   return this.http.post(this.savePublisherURL, frmData);
  // }



  savePublisher(data, image,dob) {
    const frmData = new FormData();
    frmData.append('image', image);
    frmData.append('publisherName',data.publisherName);
    frmData.append('fullName',data.fullName);
    frmData.append('email',data.email);
    frmData.append('domain',data.domain);
    frmData.append('isActive',data.isActive);
    frmData.append('registeredDate',dob);
    frmData.append('sgBaseUrl',data.sgBaseUrl);
    frmData.append('sgClientId',data.sgClientId);
    frmData.append('sgScope',data.sgScope);
    frmData.append('sgGrantType',data.sgGrantType);
    frmData.append('sgClientSecret',data.sgClientSecret);
    frmData.append('password',data.password);
    frmData.append('sgUsername',data.sgUsername);
    frmData.append('sgTokenType',data.sgTokenType);
    frmData.append('headerColor',data.headerColor);
    frmData.append('footerColor',data.headerColor);
    frmData.append('headerScript',data.headerScript);
    frmData.append('leaderboard1',data.leaderboard1);
    frmData.append('sidebar1',data.sidebar1);
    frmData.append('sidebar2',data.sidebar2);
    frmData.append('sidebar3',data.sidebar3);
    frmData.append('sidebar4',data.sidebar4)
    return this.http.post(this.savePublisherURL, frmData);
  }


  editPublisher(data, image,editid,dob) {
    const frmData = new FormData();
    if (image) {
      frmData.append('image', image);
    }
    frmData.append('publisherId',editid);
    frmData.append('publisherName',data.publisherName);
    frmData.append('fullName',data.fullName);
    frmData.append('email',data.email);
    frmData.append('domain',data.domain);
    frmData.append('isActive',data.isActive);
    frmData.append('registeredDate',dob);
    frmData.append('sgBaseUrl',data.sgBaseUrl);
    frmData.append('sgClientId',data.sgClientId);
    frmData.append('sgScope',data.sgScope);
    frmData.append('sgGrantType',data.sgGrantType);
    frmData.append('sgClientSecret',data.sgClientSecret);
    frmData.append('password',data.password);
    frmData.append('sgUsername',data.sgUsername);
    frmData.append('sgTokenType',data.sgTokenType);
    frmData.append('headerColor',data.headerColor);
    frmData.append('footerColor',data.footerColor);
    frmData.append('headerScript',data.headerScript);
    frmData.append('leaderboard1',data.leaderboard1);
    frmData.append('sidebar1',data.sidebar1);
    frmData.append('sidebar2',data.sidebar2);
    frmData.append('sidebar3',data.sidebar3);
    frmData.append('sidebar4',data.sidebar4)
    return this.http.put(this.editPublisherURL, frmData);
  }

  removePublisher(id):Observable<any>{
    return this.corehttpService.httpGetRequest(this.removePublisherURL+id)


  }


}
