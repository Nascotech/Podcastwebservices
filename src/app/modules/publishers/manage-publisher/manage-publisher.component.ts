import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PublisherService } from 'src/app/services/publisher.service';
declare var $: any;
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { ColorEvent } from 'ngx-color';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { environment } from 'src/environments/environment';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manage-publisher',
  templateUrl: './manage-publisher.component.html',
  styleUrls: ['./manage-publisher.component.css']
})
export class ManagePublisherComponent implements OnInit {
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  value="1";
  color: Object;
  datepickercolor:'#7367F0';
  hexColor: String;
  rgbaColor: Object;
  imageChangedEvent: any = '';
  publisherForm:FormGroup;
  sgrecastForm:FormGroup;
  leaderboardForm:FormGroup;
  manageheaderForm:FormGroup;
  sidebar4Form:FormGroup;
  sidebar3Form:FormGroup;
  sidebar2Form:FormGroup;
  themeForm:FormGroup;
  sidebar1Form:FormGroup;
  submitted = false;
  errorMessage: string;
  validationMessage = [];
  croppedImage: any = 'assets/img/150.png';
  finalImage: any = {};
  finalcolor:any;
  editid:any;
  publisherInfo:any;
  imgURL:string;
  maxDate: any = {};
  registeredDate:string;
  Publisherstatus:any=[
    {
      value:1,
      name:'Active'
    },
    {
      value:0,
      name:'Inactive'
    }
  ]
  constructor(private router:Router,
    private publisherService:PublisherService,
    private fb:FormBuilder,
    private tostrService:ToastrService,
    private cpService: ColorPickerService,
    private route:ActivatedRoute,
    private config: NgbDatepickerConfig) {

     
      this.publisherForm=this.fb.group({
        publisherName:['',Validators.required],
        fullName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        domain:['',[Validators.required,Validators.pattern(this.reg)]],
        image:['',Validators.required],
        isActive:[1],
        registeredDate:['']

      });

      this.sgrecastForm= this.fb.group({
        sgBaseUrl:['',[Validators.required,Validators.pattern(this.reg)]],
        sgUsername:['',Validators.required],
        sgClientSecret:['',Validators.required],
        sgGrantType:['',Validators.required],
        sgClientId:['',Validators.required],
        sgScope:['',Validators.required],
        password:['',Validators.required],
        sgTokenType:['',Validators.required]
      });
      this.leaderboardForm= this.fb.group({
        leaderboard1:[]
      });
      this.manageheaderForm=this.fb.group({
        manageheader:[]
      });
      this.sidebar4Form=this.fb.group({
        sidebar4:[]
      });
      this.sidebar3Form=this.fb.group({
        sidebar3:[]
      });
      this.sidebar2Form=this.fb.group({
        sidebar2:[]
      });
      this.sidebar1Form=this.fb.group({
        sidebar1:[]
      });
      this.themeForm=this.fb.group({
        headerColor:['',Validators.required],
        
      })
     }


  ngOnInit() {
    this.imgURL=environment.img_uri;
    
    this.route.paramMap.subscribe( paramMap => {

      this.editid = paramMap.get('id');
      this.publisherInfo=JSON.parse(localStorage.getItem('publisherdetail'));
      
      if(this.editid != null && this.publisherInfo != null)
      {
        this.croppedImage= this.imgURL+this.publisherInfo.photo.path;
        this.getDateFormat(this.publisherInfo.registeredDate);
        //this.finaldate=moment(this.publisherInfo.registeredDate).format('DD-MM-YYYY');
        this.finalcolor=this.publisherInfo.headerColor;
        this.publisherForm.patchValue({
          "publisherName":this.publisherInfo.publisherName,
          "fullName":this.publisherInfo.fullName,
          "email":this.publisherInfo.email,
          "domain":this.publisherInfo.domain,
          "isActive":this.publisherInfo.isActive,
          "image":this.publisherInfo.photo ? this.publisherInfo.photo.fileName : 'assets/img/noavatar.png',
          // "registeredDate":moment(this.publisherInfo.registeredDate).format('DD-MM-YYYY')
        });
        this.sgrecastForm.patchValue({
          "sgBaseUrl":this.publisherInfo.sgBaseUrl,
          "sgUsername":this.publisherInfo.sgUsername,
          "sgClientSecret":this.publisherInfo.sgClientSecret,
          "sgGrantType":this.publisherInfo.sgGrantType,
          "sgClientId":this.publisherInfo.sgClientId,
          "sgScope":this.publisherInfo.sgScope,
          "sgTokenType":this.publisherInfo.sgTokenType,
          "password":this.publisherInfo.password
        });
        this.themeForm.patchValue({
          "headerColor":this.publisherInfo.headerColor
        });
        this.manageheaderForm.patchValue({
          "manageheader":atob(this.publisherInfo.headerScript)
        });
        this.sidebar1Form.patchValue({
          "sidebar1":atob(this.publisherInfo.sidebar1)
        });
        this.sidebar2Form.patchValue({
          "sidebar2":atob(this.publisherInfo.sidebar2)
        });
        this.sidebar3Form.patchValue({
          "sidebar3":atob(this.publisherInfo.sidebar3)
        });
        this.sidebar4Form.patchValue({
          "sidebar4":atob(this.publisherInfo.sidebar4)
        });
        this.leaderboardForm.patchValue({
          "leaderboard1":atob(this.publisherInfo.leaderboard1)
        })
      }
     
     // this.finaldate=moment(this.publisherForm.get('registeredDate').value).format('YYYY-MM-DD')

  })
  }


  get f(){
    return this.publisherForm.controls;
  }

  get p(){
    return this.sgrecastForm.controls;
  }
  get t()
  {
    return this.themeForm.controls;
  }

 
  onSubmit()
  {
    if(this.editid === null)
    {
      this.submitted = true;   
      if (!this.publisherForm.valid || !this.sgrecastForm.valid || !this.themeForm.valid) {
        return;
      }
      else
      {
        const date = this.publisherForm.value.registeredDate;
        this.registeredDate = date.year + '-' + date.month + '-' + date.day;
        const data={
          publisherName:this.publisherForm.get('publisherName').value,
          fullName:this.publisherForm.get('fullName').value,
          email:this.publisherForm.get('email').value,
          domain:this.publisherForm.get('domain').value,
          isActive:this.publisherForm.get('isActive').value,
          registeredDate:this.registeredDate,
          sgBaseUrl:this.sgrecastForm.get('sgBaseUrl').value,
          sgClientId:this.sgrecastForm.get('sgClientId').value,
          sgScope:this.sgrecastForm.get('sgScope').value,
          sgGrantType:this.sgrecastForm.get('sgGrantType').value,
          sgClientSecret:this.sgrecastForm.get('sgClientSecret').value,
          password:this.sgrecastForm.get('password').value,
          sgUsername:this.sgrecastForm.get('sgUsername').value,
          sgTokenType:this.sgrecastForm.get('sgTokenType').value,
          headerColor:this.finalcolor,
          footerColor:this.finalcolor,
          headerScript:btoa(this.manageheaderForm.get('manageheader').value),
          leaderboard1:btoa(this.leaderboardForm.get('leaderboard1').value),
          sidebar1:btoa(this.sidebar1Form.get('sidebar1').value),
          sidebar2:btoa(this.sidebar2Form.get('sidebar2').value),
          sidebar3:btoa(this.sidebar3Form.get('sidebar3').value),
          sidebar4:btoa(this.sidebar4Form.get('sidebar4').value)
  
        }
        this.publisherService.savePublisher(data,this.finalImage,this.registeredDate).subscribe((data:any)=>{
          this.submitted = false;
          if (data.errorMsg === "")  {
            this.router.navigate(['/dashboard/1']);
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
            this.router.navigate(['/dashboard/1']);
          } else {
           // this.errorMessage = error.error.errorMsg;
          }
        })
      }
    }
    else
    {
      this.submitted = true;
      if (this.publisherForm.invalid) {
        return;
      }
      else
      {
        const date = this.publisherForm.value.registeredDate;
        this.registeredDate = date.year + '-' + date.month + '-' + date.day;
        const data={
          publisherId:this.editid,
          publisherName:this.publisherForm.get('publisherName').value,
          fullName:this.publisherForm.get('fullName').value,
          email:this.publisherForm.get('email').value,
          domain:this.publisherForm.get('domain').value,
          isActive:this.publisherForm.get('isActive').value,
          sgBaseUrl:this.sgrecastForm.get('sgBaseUrl').value,
          sgClientId:this.sgrecastForm.get('sgClientId').value,
          sgScope:this.sgrecastForm.get('sgScope').value,
          sgGrantType:this.sgrecastForm.get('sgGrantType').value,
          sgClientSecret:this.sgrecastForm.get('sgClientSecret').value,
          password:this.sgrecastForm.get('password').value,
          sgUsername:this.sgrecastForm.get('sgUsername').value,
          sgTokenType:this.sgrecastForm.get('sgTokenType').value,
          headerColor:this.finalcolor,
          footerColor:this.finalcolor,
          headerScript:btoa(this.manageheaderForm.get('manageheader').value),
          leaderboard1:btoa(this.leaderboardForm.get('leaderboard1').value),
          sidebar1:btoa(this.sidebar1Form.get('sidebar1').value),
          sidebar2:btoa(this.sidebar2Form.get('sidebar2').value),
          sidebar3:btoa(this.sidebar3Form.get('sidebar3').value),
          sidebar4:btoa(this.sidebar4Form.get('sidebar4').value)
  
        }
        this.publisherService.editPublisher(data,this.finalImage,this.editid,this.registeredDate).subscribe((data:any)=>{
          this.submitted = false;
          if (data.errorMsg === "")  {
            this.router.navigate(['/dashboard/1']);
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
            this.router.navigate(['/dashboard/1']);
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
    this.publisherForm.patchValue({registeredDate: dob});
  }

  onChange(value)
  {
    
  }

  gotobackpage()
  {
    this.router.navigate(['/dashboard/1'])
  }

  reset()
  {
    this.router.navigate(['/dashboard/1'])
  }

  removeImage() {
    this.publisherForm.patchValue({image: ''});
    this.croppedImage = 'assets/img/150.png';
    this.publisherForm.get('image').setValidators(Validators.required);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    $('#publisherImageModel').modal('show');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let blobFile = this.dataURItoBlob(this.croppedImage);
    let imageName = new Date().valueOf() + '_' + "image" + '.jpeg';
    this.publisherForm.patchValue({image: imageName});
    this.finalImage = new File([blobFile], imageName, {type: "'image/jpeg'"});
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

    return new Blob([ia], {type:mimeString});
  }


  public onEventLog(event: string, data: any): void {
    this.finalcolor=data; 
    if(this.finalcolor?.color == '' || null)
    {
      this.themeForm.get('headerColor').setValidators(Validators.required);
      this.themeForm.get('headerColor').updateValueAndValidity(); 

    }
    else{
      this.themeForm.get('headerColor').clearValidators();
      this.themeForm.get('headerColor').updateValueAndValidity(); 

    }

  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }


}

  

  



