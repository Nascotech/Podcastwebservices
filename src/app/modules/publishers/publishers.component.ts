import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publisherdata: any;
  photoUrl: any;
  finalcolor: any;
  checkEnv = false;
  domain = "atunwapodcasts.com";

  constructor(
    private toastr: ToastrService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoUrl = environment.img_uri;
    this.publisherdata = JSON.parse(localStorage.getItem('publisherdetail'));
    this.finalcolor = this.publisherdata.headerColor;
    this.checkEnv = this.commonService.CHECK_ENV.isDev;
    console.log(this.checkEnv);

    if(this.checkEnv) {
      this.domain = "devpub.atunwapodcasts.com";
    }
  }

  gotobackpage() {
    this.router.navigate(['/dashboard'])
  }

  redirectToPage(link: string) {
    if (!link) return '';
    return !(link.startsWith("http://") || link.startsWith("https://")) ? "http://" + link : link;
  }

  gotoeditpage(publisher) {
    this.router.navigate(['/edit/' + publisher.id]);
    localStorage.setItem('publisherdetail', JSON.stringify(publisher))
  }
}
