import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm:FormGroup;
  submitted = false;
  errorMessage: string;
  validationMessage: any = [];
  isshow:boolean=true;
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router) {
    this.forgotpasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
   }

  ngOnInit() {

  }

  get f() { return this.forgotpasswordForm.controls; }


  ForgotPassword()
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotpasswordForm.invalid) {
      this.submitted = false;
      return;
    } else {
      this.authService.forgotPassword(this.forgotpasswordForm.value).subscribe((data: any) => {
        if (data.errorMsg === '')  {
          $('#reset-form').hide();
          $('#confirmation').show();
          this.isshow=false;
        } else if (data.errorMsg === 'validationError') {
          const messages = data.response.message;
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
          this.errorMessage = 'Problem to reaching out the server, Try Again later.';
          this.submitted = false;
          /* report to developers (email about service)*/
        } else if (error.status === 401) {
          //this.constant.clearStorage();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = error.error.errorMsg;
          this.submitted = false;
        }
      });
    }
  }

}
