import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PublisherService } from 'src/app/services/publisher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ColorEvent } from 'ngx-color';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { environment } from 'src/environments/environment';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-manage-publisher',
  templateUrl: './manage-publisher.component.html',
  styleUrls: ['./manage-publisher.component.css']
})
export class ManagePublisherComponent implements OnInit {

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  value = "1";
  color: Object;
  datepickercolor: '#7367F0';
  hexColor: String;
  rgbaColor: Object;
  imageChangedEvent: any = '';
  favIconChangedEvent: any = '';
  publisherForm: FormGroup;
  submitted = false;
  errorMessage: string;
  validationMessage = [];
  croppedImage: any = 'assets/img/150.png';
  croppedfavIcon: any = 'assets/img/150.png';
  finalImage: any = {};
  finalfavIcon: any = {};
  finalcolor: any;
  editid: any;
  publisherInfo: any;
  imgURL: string;
  maxDate: any = {};
  registeredDate: string;
  finaldomain: any;
  finalhomedomain: any;
  finalprivacyploicydomain: any;
  finaltemsofusedomain: any;
  selectedfavIcon: File;
  Publisherstatus: any = [
    {
      value: 1,
      name: 'Active'
    },
    {
      value: 0,
      name: 'Inactive'
    }
  ];

  groupId : any;
  groupList : any = [];
  groupName : any;
  groupNames : any;

  sgRefreshToken : any;
  sgAccessToken : any;

  constructor(
    private router: Router,
    private publisherService: PublisherService,
    private fb: FormBuilder,
    private tostrService: ToastrService,
    private cpService: ColorPickerService,
    private route: ActivatedRoute,
    private config: NgbDatepickerConfig,
    private toastr :ToastrService
  ) {
    this.publisherForm = this.fb.group({
      publisherName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domain: ['', [Validators.required, Validators.pattern(this.reg)]],
      homeDomain: ['', [Validators.required, Validators.pattern(this.reg)]],
      image: ['', Validators.required],
      favIcon: ['', Validators.required],
      isActive: [1],
      registeredDate: [''],
      sgBaseUrl: ['', [Validators.required, Validators.pattern(this.reg)]],
      sgUsername: ['', Validators.required],
      sgClientSecret: ['', Validators.required],
      sgGrantType: ['', Validators.required],
      sgClientId: ['', Validators.required],
      sgScope: ['', Validators.required],
      password: ['', Validators.required],
      sgTokenType: ['', Validators.required],
      headerColor: ['', Validators.required],
      googleCode: ['', Validators.required],
      privacyPolicy: ['', [Validators.required, Validators.pattern(this.reg)]],
      termsOfUse: ['', [Validators.required, Validators.pattern(this.reg)]]
    });
  }

  ngOnInit() {
    this.imgURL = environment.img_uri;
    this.route.paramMap.subscribe(paramMap => {
      this.editid = paramMap.get('id');
      this.publisherInfo = JSON.parse(localStorage.getItem('publisherdetail'));
      if (this.editid != null && this.publisherInfo != null) {
        if (this.publisherInfo.photo) {
          this.croppedImage = this.imgURL + this.publisherInfo.photo.path;
        }
        if (this.publisherInfo.favIcon) {
          this.croppedfavIcon = this.imgURL + this.publisherInfo.favIcon.path;
        }
        if (this.publisherInfo.registeredDate) {
          this.getDateFormat(this.publisherInfo.registeredDate);
        }
        if(this.publisherInfo.groupId && this.publisherInfo.groupName) {
          this.groupNames = this.publisherInfo.groupName
        }
        if(this.publisherInfo.sgRefreshToken && this.publisherInfo.sgAccessToken) {
          this.sgAccessToken = this.publisherInfo.sgAccessToken;
          this.sgRefreshToken = this.publisherInfo.sgRefreshToken
        }
        this.finalcolor = this.publisherInfo.headerColor;
        this.publisherForm.patchValue({
          "publisherName": this.publisherInfo.publisherName,
          "fullName": this.publisherInfo.fullName,
          "email": this.publisherInfo.email,
          "domain": this.publisherInfo.domain,
          "homeDomain": this.publisherInfo.homeDomain,
          "privacyPolicy": this.publisherInfo.privacyPolicy,
          "termsOfUse": this.publisherInfo.termsOfUse,
          "isActive": this.publisherInfo.isActive,
          "favIcon": this.publisherInfo.favIcon ? this.publisherInfo.favIcon.fileName : 'assets/img/noavatar.png',
          "image": this.publisherInfo.photo ? this.publisherInfo.photo.fileName : 'assets/img/noavatar.png',
          "sgBaseUrl": this.publisherInfo.sgBaseUrl,
          "sgUsername": this.publisherInfo.sgUsername,
          "sgClientSecret": this.publisherInfo.sgClientSecret,
          "sgGrantType": this.publisherInfo.sgGrantType,
          "sgClientId": this.publisherInfo.sgClientId,
          "sgScope": this.publisherInfo.sgScope,
          "googleCode": (this.publisherInfo.googleCode) ? window.atob(this.publisherInfo.googleCode) : '',
          "sgTokenType": this.publisherInfo.sgTokenType,
          "password": this.publisherInfo.sgPassword,
          "headerColor": this.publisherInfo.headerColor,
        });
      }
    })
  }

  get f() {
    return this.publisherForm.controls;
  }

  onSubmit() {
    if (this.editid === null) {
      this.submitted = true;
      if (!this.publisherForm.valid) {
        return;
      } else {
        const date = this.publisherForm.value.registeredDate;
        this.registeredDate = date.year + '-' + date.month + '-' + date.day;
        const domainstring = this.publisherForm.get('domain').value;
        const domainhomestring = this.publisherForm.get('homeDomain').value;
        const domainprivacypolicy = this.publisherForm.get('privacyPolicy').value;
        const domaintermsofuse = this.publisherForm.get('termsOfUse').value;
        this.domainremoveLastcharacter();
        const data = {
          publisherName: this.publisherForm.get('publisherName').value,
          fullName: this.publisherForm.get('fullName').value,
          email: this.publisherForm.get('email').value,
          domain: this.finaldomain,
          homeDomain: this.finalhomedomain,
          isActive: this.publisherForm.get('isActive').value,
          registeredDate: this.registeredDate,
          sgBaseUrl: this.publisherForm.get('sgBaseUrl').value,
          sgClientId: this.publisherForm.get('sgClientId').value,
          sgScope: this.publisherForm.get('sgScope').value,
          sgGrantType: this.publisherForm.get('sgGrantType').value,
          sgClientSecret: this.publisherForm.get('sgClientSecret').value,
          password: this.publisherForm.get('password').value,
          sgUsername: this.publisherForm.get('sgUsername').value,
          sgTokenType: this.publisherForm.get('sgTokenType').value,
          googleCode: btoa(this.publisherForm.get('googleCode').value),
          headerColor: this.finalcolor,
          footerColor: this.finalcolor,
        }

        this.publisherService.savePublisher(data, this.finalImage, this.registeredDate, this.finalfavIcon).subscribe((data: any) => {
          this.submitted = false;
          if (data.errorMsg === "") {
            this.router.navigate(['/dashboard']);
            this.tostrService.success('New record added successfully.', 'Success');
          } else if (data.errorMsg === "ValidationError") {
            let messages = data.response.message;
            if (messages.length > 1) {
              this.validationMessage = messages;
            } else {
              this.errorMessage = data.response.message;
            }
          } else {
            this.errorMessage = data.errorMsg;
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.submitted = false;
            this.errorMessage = "Server can't be connect try again.";
          } else if (error.status === 401) {
            this.submitted = false;
            this.router.navigate(['/dashboard']);
          } else {
          }
        })
      }
    } else {
      this.submitted = true;
      if (this.publisherForm.invalid) {
        return;
      } else {
        const date = this.publisherForm.value.registeredDate;
        this.registeredDate = date.year + '-' + date.month + '-' + date.day;
        this.domainremoveLastcharacter()
        const data = {
          publisherId: this.editid,
          publisherName: this.publisherForm.get('publisherName').value,
          fullName: this.publisherForm.get('fullName').value,
          email: this.publisherForm.get('email').value,
          domain: this.finaldomain,
          homeDomain: this.finalhomedomain,
          privacyPolicy: this.finalprivacyploicydomain,
          termsOfUse: this.finaltemsofusedomain,
          isActive: this.publisherForm.get('isActive').value,
          sgBaseUrl: this.publisherForm.get('sgBaseUrl').value,
          sgClientId: this.publisherForm.get('sgClientId').value,
          sgScope: this.publisherForm.get('sgScope').value,
          sgGrantType: this.publisherForm.get('sgGrantType').value,
          sgClientSecret: this.publisherForm.get('sgClientSecret').value,
          password: this.publisherForm.get('password').value,
          sgUsername: this.publisherForm.get('sgUsername').value,
          sgTokenType: this.publisherForm.get('sgTokenType').value,
          googleCode: btoa(this.publisherForm.get('googleCode').value),
          headerColor: this.finalcolor,
          footerColor: this.finalcolor,
        }

        this.publisherService.editPublisher(data, this.finalImage, this.editid, this.registeredDate, this.finalfavIcon).subscribe((data: any) => {
          this.submitted = false;
          if (data.errorMsg === "") {
            this.router.navigate(['/dashboard']);
            this.tostrService.success('New record edited successfully.', 'Success');
          } else if (data.errorMsg === "ValidationError") {
            let messages = data.response.message;
            if (messages.length > 1) {
              this.validationMessage = messages;
            } else {
              this.errorMessage = data.response.message;
            }
          } else {
            this.errorMessage = data.errorMsg;
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.submitted = false;
            this.errorMessage = "Server can't be connect try again.";
          } else if (error.status === 401) {
            this.submitted = false;
            this.router.navigate(['/dashboard']);
          } else {
            // this.errorMessage = error.error.errorMsg;
          }
        })
      }
    }
  }

  getDateFormat(date) {
    this.registeredDate = date;
    const arr = date.split('-');
    const dob = {
      year: parseInt(arr[0]),
      month: parseInt(arr[1]),
      day: parseInt(arr[2])
    };
    this.publisherForm.patchValue({ registeredDate: dob });
  }

  onChange(value) {

  }

  gotobackpage() {
    this.router.navigate(['/dashboard'])
  }

  reset() {
    this.router.navigate(['/dashboard'])
  }

  removeImage() {
    this.publisherForm.patchValue({ image: '' });
    this.croppedImage = 'assets/img/150.png';
    this.publisherForm.get('image').setValidators(Validators.required);
  }

  removefavIcon() {
    this.publisherForm.patchValue({ favIcon: '' });
    this.croppedfavIcon = 'assets/img/150.png';
    this.publisherForm.get('favIcon').setValidators(Validators.required);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    $('#publisherImageModel').modal('show');
  }

  onFavIconChanged(event: any): void {
    this.favIconChangedEvent = event;
    $('#favIconModel').modal('show');
  }

  favIconCropped(event: ImageCroppedEvent) {
    this.croppedfavIcon = event.base64;
    let blobFile = this.dataURItoBlob(this.croppedfavIcon);
    let imageName = new Date().valueOf() + '_' + "image" + '.jpeg';
    this.publisherForm.patchValue({ favIcon: imageName });
    this.finalfavIcon = new File([blobFile], imageName, { type: "'image/jpeg'" });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let blobFile = this.dataURItoBlob(this.croppedImage);
    let imageName = new Date().valueOf() + '_' + "image" + '.jpeg';
    this.publisherForm.patchValue({ image: imageName });
    this.finalImage = new File([blobFile], imageName, { type: "'image/jpeg'" });
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  domainremoveLastcharacter() {
    const domainstring = this.publisherForm.get('domain').value;
    const homedomainstring = this.publisherForm.get('homeDomain').value;
    const domainparivacypolicystring = this.publisherForm.get('privacyPolicy').value;
    const domaintermsofusestring = this.publisherForm.get('termsOfUse').value;
    if (domainstring.substr(domainstring.length - 1)) {
      var lastcharacter = domainstring.substr(domainstring.length - 1);
      if (lastcharacter === '/') {
        this.finaldomain = this.publisherForm.get('domain').value.slice(0, -1);
      } else {
        this.finaldomain = this.publisherForm.get('domain').value;
      }
    }
    if (homedomainstring.substr(homedomainstring.length - 1)) {
      var lastcharacter = homedomainstring.substr(homedomainstring.length - 1);
      if (lastcharacter === '/') {
        this.finalhomedomain = this.publisherForm.get('homeDomain').value.slice(0, -1);
      } else {
        this.finalhomedomain = this.publisherForm.get('homeDomain').value;
      }
    }
    if (domainparivacypolicystring.substr(domainparivacypolicystring.length - 1)) {
      var lastcharacter = domainparivacypolicystring.substr(domainparivacypolicystring.length - 1);
      if (lastcharacter === '/') {
        this.finalprivacyploicydomain = this.publisherForm.get('privacyPolicy').value.slice(0, -1);
      } else {
        this.finalprivacyploicydomain = this.publisherForm.get('privacyPolicy').value;
      }
    }
    if (domaintermsofusestring.substr(domaintermsofusestring.length - 1)) {
      var lastcharacter = domaintermsofusestring.substr(domaintermsofusestring.length - 1);
      if (lastcharacter === '/') {
        this.finaltemsofusedomain = this.publisherForm.get('termsOfUse').value.slice(0, -1);
      } else {
        this.finaltemsofusedomain = this.publisherForm.get('termsOfUse').value;
      }
    }
  }


  public onEventLog(event: string, data: any): void {
    this.finalcolor = data;
    if (this.finalcolor ?.color == '' || null) {
      this.publisherForm.get('headerColor').setValidators(Validators.required);
      this.publisherForm.get('headerColor').updateValueAndValidity();
    } else {
      this.publisherForm.get('headerColor').clearValidators();
      this.publisherForm.get('headerColor').updateValueAndValidity();
    }
  }

  onChangeGroup(event) {      
    if(event != 'null') {
      let info =  this.groupList.find(x => x.id == event);
      this.groupId = info.id;
      this.groupName = info.displayName;
    } else {
      this.groupId = '';
      this.groupName = '';
    }
  }

  openGropModel() {
    this.publisherService.getPublisherGroup(this.editid).subscribe((data: any) => {
      this.groupList = data.response.data;
      $('#stationModal').modal('show');
    },(error) => {
      this.tostrService.error(error);
    });
  }

  saveDefaultGroup() {
    this.publisherService.defaultPublisherGroup(this.editid, this.groupId , this.groupName).subscribe((data: any) => {
      //this.groupId = '';
      localStorage.setItem('publisherdetail', JSON.stringify(data.response));
      this.groupNames = data.response.groupName;
      $('#stationModal').modal('hide');
      this.toastr.success('Publisher default group updated successfully.', 'Success');
      this.ngOnInit();
    },(error) => {
      this.tostrService.error(error);
    });
  }
}
