import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  currentuser:any;
  errorMessage: string;
  changePasswordForm:FormGroup;
  submitted = false;
  validationMessage = [];
  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.currentuser=JSON.parse(localStorage.getItem('currentUser'));
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: [
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
      validator: MustMatch('newPassword', 'confirmPassword')
    });
    
  }

  Logout()
  {
    localStorage.removeItem('currentUser');
    $('#logoutModal').modal('hide');
    this.router.navigate(['/']);
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  changePassword() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      const data={
        oldPassword:this.changePasswordForm.get('oldPassword').value,
        newPassword:this.changePasswordForm.get('newPassword').value,
        confirmPassword:this.changePasswordForm.get('confirmPassword').value
      }
      this.authService.changeAdminPassword(data).subscribe((data: any) => {
        this.submitted = false;
        if (data.errorMsg === "")  {     
          $('#changeAdminPassword').modal('hide');
          // this.ngOnInit();   
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
          this.errorMessage = "Server can't be connect try again.";
        } else if (error.status === 401) {
           this.router.navigate(['/']);
        } else {
          this.errorMessage = error.error.errorMsg;
        }
      });
    }
  }

}
