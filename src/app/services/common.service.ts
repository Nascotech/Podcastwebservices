import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  devicePlatform='web';
  deviceToken=uuid.v4();
  deviceUniqueId= 'web'+uuid.v4();
  deviceInfo = null;
  os=null;
  deviceModel=null;

  constructor(
    private  router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.getDevicedetails();
  }

  PAGINATION = {
    default_page_size: 10,
  };

  getDevicedetails() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.os=this.deviceInfo.os;
    this.deviceModel=this.deviceInfo.browser;
  } 


}
