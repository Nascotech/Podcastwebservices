import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {FullWidthComponent} from './layouts/full-width/full-width.component';
import {LoginComponent} from './modules/login/login.component';
import {ForgotPasswordComponent} from './modules/forgot-password/forgot-password.component';
import {ManagePublisherComponent} from './modules/publishers/manage-publisher/manage-publisher.component';


const routes: Routes = [
  {
    path: '',
    component: FullWidthComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: 'forgot-password',
    component: FullWidthComponent,
    children: [
      { path: '', component: ForgotPasswordComponent},
    ]
  },
  {
    path: 'dashboard/:page',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent}
    ]
  },
  {
    path:'publisher',
    loadChildren: 'src/app/modules/publishers/publishers.module#PublishersModule'
  },
  // {
  //   path: 'publisher',
  //   component: DefaultComponent,
  //   children: [
  //     { path: 'add', component: ManagePublisherComponent},
  //     { path: 'edit/:id', component: ManagePublisherComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
