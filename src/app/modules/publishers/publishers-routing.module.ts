import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagePublisherComponent } from './manage-publisher/manage-publisher.component';
import { PublishersComponent } from './publishers.component';
import { DefaultComponent } from 'src/app/layouts/default/default.component';


const publisherRoutes: Routes = [
  {
    path: '', 
    component: DefaultComponent,
    children: [
        { path: 'add', component: ManagePublisherComponent},
        { path: 'edit/:id', component: ManagePublisherComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(publisherRoutes)
  ],
  declarations: [ ]
})
export class PublishersRoutingModule { }