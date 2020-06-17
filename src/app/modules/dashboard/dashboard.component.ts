import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedPage: number;
  totalLength: number;
  pageSize: number;
  finalPage = 1;
  pageNumber: number;
  keyword='';
  publisherList:any=[];
  collectionSize: number;
  isLoading = true;
  model: any = {};
  selectedPublisherId: string;
  photoUrl: string;
  constructor(private toastr: ToastrService,
    private router:Router,
    private commonService:CommonService,
    private route:ActivatedRoute,
    private publisherService:PublisherService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.pageNumber = params['page']);
    this.selectedPage = this.pageNumber;
    this.pageSize = this.commonService.PAGINATION.default_page_size;
    this.getPublishers();
    this.photoUrl = environment.img_uri;
  }

  gotoaddPage()
  {
    localStorage.removeItem("publisherdetail");
    this.router.navigate(['/publisher/add'])
  }

  getPublishers()
  {
    this.publisherService.getPublisherlist(this.selectedPage, this.pageSize, this.keyword).subscribe(data=>{
      this.publisherList=data.response.list;
      this.totalLength = data.response.count;
      this.finalPage = this.selectedPage;
      this.collectionSize = data.response.list.length;
      this.isLoading = false;
    },
    (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.router.navigate(['/']);
      }
    })

    
  }

  setPaginationPage(event) {
    this.selectedPage = event;
    this.getPublishers();
  }

  onPageSizeChange(event) {
    this.pageSize = event.target.value;
    this.getPublishers();
  }

  search(e) {
    this.keyword = e.target.value;
    this.getPublishers();
  }

  removePublisher(publisherId)
  {
    this.selectedPublisherId=publisherId;
    $('#removePublisherModal').modal('show');
  }

  removePublisherConfirm() {
    $('#removePublisherModal').modal('hide');
    this.publisherService.removePublisher(this.selectedPublisherId).subscribe((data: any) => {
      this.getPublishers();
      if (data.errorMsg === "") {
        this.toastr.success('Publisher Deleted successfully.', 'Success');
      } else {
        this.toastr.error(data.errorMsg, 'Failure');
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.router.navigate(['/dashboard/1']);
      } else {
        this.getPublishers();
        this.toastr.error(error.error.errorMsg, 'Error');
      }
    });
  }

  gotoeditpage(publisher)
  {
    let id= publisher.id;
    this.router.navigate(['/edit/'+id]);
    localStorage.setItem("publisherdetail",JSON.stringify(publisher));
    
  }

}
