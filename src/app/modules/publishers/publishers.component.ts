import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {
  publisherdata:any;
  photoUrl:any;
  manageheader:any;
  sidebar1:any;
  sidebar2:any;
  sidebar3:any;
  sidebar4:any;
  leaderboard:any;
  finalcolor:any;
  constructor(private toastr: ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.photoUrl=environment.img_uri;
    this.publisherdata = JSON.parse(localStorage.getItem('publisherdetail'));
    this.manageheader = atob(this.publisherdata.headerScript);
    this.sidebar1 = atob(this.publisherdata.sidebar1);
    this.sidebar2 = atob(this.publisherdata.sidebar2);
    this.sidebar3 = atob(this.publisherdata.sidebar3);
    this.sidebar4= atob(this.publisherdata.sidebar4);
    this.leaderboard = atob(this.publisherdata.leaderboard1);
    this.finalcolor= this.publisherdata.headerColor;
  }

  gotobackpage()
  {
    this.router.navigate(['/dashboard/1'])
  }

  redirectToPage(link:string) {
    if(!link) return '';
      return !(link.startsWith("http://") || link.startsWith("https://")) ? "http://" + link : link;    
    
  }

  gotoeditpage(publisher)
  {
    this.router.navigate(['/edit/'+publisher.id]);
    localStorage.setItem('publisherdetail',JSON.stringify(publisher))
  }

}
