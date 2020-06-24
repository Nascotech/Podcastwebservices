import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string;
  validationMessage = [];
  constructor(private router:Router,
    private fb:FormBuilder,
    private authService:AuthService,
    private commonService:CommonService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.submitted = false;
      return;
    } else {
      const data = {
        email:this.loginForm.get('email').value,
        password:this.loginForm.get('password').value,
        devicePlatform:this.commonService.devicePlatform,
        deviceToken:this.commonService.deviceToken,
        deviceUniqueId:this.commonService.deviceUniqueId,
        os:this.commonService.os,
        deviceModel:this.commonService.deviceModel
      }
      this.authService.login(data).subscribe((res: any) => {
        this.submitted = false;
        if(res.errorMsg === ""){
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem('accesstoken',JSON.stringify(res.response.deviceInfo.deviceAccessToken));
          this.router.navigate(['dashboard']);
        } else if (res.errorMsg === "ValidationError") {
          let messages = res.response.message;
          if (messages.length > 1) {
            this.validationMessage = messages;
          } else {
            this.errorMessage = res.response.message;
          }
        } else {
          this.errorMessage = res.errorMsg;
        }
      },(error: HttpErrorResponse) => {
        this.submitted = false;
        if (error.status === 0) {
          this.errorMessage = "Server can't be connect try again.";
        } else {
          this.errorMessage = error.error.errorMsg;
        }
      })
    }
  }

}
