import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishersRoutingModule } from './publishers-routing.module';
import { DefaultModule } from 'src/app/layouts/default/default.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { ManagePublisherComponent } from './manage-publisher/manage-publisher.component';
import { PublishersComponent } from './publishers.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateSuffix } from 'src/app/pipes/datesuffix.pipe';
import { SlugTransformDirective } from './slug-transform.directive';

@NgModule({
  imports: [
    CommonModule,
    PublishersRoutingModule ,
    DefaultModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule,
    ColorPickerModule,
    NgbModule
  ],
  declarations: [
    ManagePublisherComponent,
    PublishersComponent,
    SlugTransformDirective
  ],
  exports: [
    SlugTransformDirective
  ],
})
export class PublishersModule { }
