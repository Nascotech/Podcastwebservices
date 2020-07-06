import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
declare var $: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  errorMessage: string;
  resetToken: '';
  validationMessage: any = [];
  istext:boolean = true;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.resetToken = params['resetToken']);
    this.checkResetToken();
    this.resetPasswordForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.resetPasswordForm.controls; }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      this.authService.resetPassword(this.resetPasswordForm.value, this.resetToken).subscribe((data: any) => {
        if (data.errorMsg === '')  {
          $('#reset-form').hide();
          this.istext=false;
          $('#password-updated').show();
          $('#link-expire').hide();
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
         // this.constant.clearStorage();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = error.error.errorMsg;
          this.submitted = false;
        }
      });
    }
  }


  checkResetToken() {
    this.authService.checkResetToken(this.resetToken).subscribe((data: any) => {
      if (data.errorMsg === '')  {
        if (!data.response.isResetToken) {
          $('#reset-form').hide();
          this.istext=false;
          $('#password-updated').hide();
          $('#link-expire').show();
        }
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
