import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {DefaultComponent} from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../modules/forgot-password/forgot-password.component';
import { PublishersComponent } from '../../modules/publishers/publishers.component';
import { ManagePublisherComponent } from '../../modules/publishers/manage-publisher/manage-publisher.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DateSuffix } from 'src/app/pipes/datesuffix.pipe';
import { PublishersModule } from 'src/app/modules/publishers/publishers.module';
import { ResetPasswordComponent } from 'src/app/modules/reset-password/reset-password.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DateSuffix
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ],
  exports:[
    DateSuffix
  ]

})
export class DefaultModule { }
