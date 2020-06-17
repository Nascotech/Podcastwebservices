import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { CoreHttpService } from './core-http.service';
import { CommonService } from './common.service';
import { AuthService } from './auth.service';



@NgModule({
  imports: [

   HttpClientModule
  ],
  declarations: [
  
  ],
  providers: [CommonService,AuthService,CoreHttpService]
})
export class ServicesModule {
}