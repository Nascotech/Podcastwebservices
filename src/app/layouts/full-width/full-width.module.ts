import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FullWidthComponent} from './full-width.component';
import {LoginComponent} from '../../modules/login/login.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FullWidthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class FullWidthModule { }
