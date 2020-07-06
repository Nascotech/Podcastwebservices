import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {FullWidthComponent} from './layouts/full-width/full-width.component';
import {LoginComponent} from './modules/login/login.component';
import {ForgotPasswordComponent} from './modules/forgot-password/forgot-password.component';
import {ManagePublisherComponent} from './modules/publishers/manage-publisher/manage-publisher.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './modules/not-found/notfound.component';
import { PublishersComponent } from './modules/publishers/publishers.component';
import { ResetPasswordComponent } from './modules/reset-password/reset-password.component';


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
    path: 'reset-password/:resetToken',
    component: DefaultComponent,
    children: [
      { path: '', component: ResetPasswordComponent},
    ]
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent,canActivate: [AuthGuard]}
    ]
  },
  {
    path: '', 
    component: DefaultComponent,
    children: [
        { path: 'publisher/add', component: ManagePublisherComponent,canActivate: [AuthGuard]},
        { path: 'edit/:id', component: ManagePublisherComponent,canActivate: [AuthGuard]},
        { path: 'view/:id', component: PublishersComponent,canActivate: [AuthGuard]}
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
