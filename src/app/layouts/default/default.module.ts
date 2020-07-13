import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {DefaultComponent} from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../modules/forgot-password/forgot-password.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DateSuffix } from 'src/app/pipes/datesuffix.pipe';
import { ResetPasswordComponent } from 'src/app/modules/reset-password/reset-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AccountSettingsComponent } from 'src/app/modules/account-settings/account-settings.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DateSuffix,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    PasswordStrengthMeterModule
  ],
  exports:[
    DateSuffix
  ]

})
export class DefaultModule { }
