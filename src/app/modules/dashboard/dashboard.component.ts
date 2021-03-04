import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
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
  pageNumber = 1;
  keyword = '';
  publisherList: any = [];
  collectionSize: number;
  isLoading = true;
  model: any = {};
  selectedPublisherId: string;
  photoUrl: string;
  finaldate: any;
  groupList: any = [];
  groupId: any;
  checkEnv = false;
  domain = "atunwapodcasts.com";

  constructor(private toastr: ToastrService,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    private tostrService: ToastrService) { }

  ngOnInit() {
    //this.route.params.subscribe(params => this.pageNumber = params['page']);
    this.selectedPage = this.pageNumber;
    this.pageSize = this.commonService.PAGINATION.default_page_size;
    this.checkEnv = this.commonService.CHECK_ENV.isDev;
    if(this.checkEnv) {
      this.domain = "devpub.atunwapodcasts.com";
    }
    this.getPublishers();
    this.photoUrl = environment.img_uri;
  }

  gotoaddPage() {
    localStorage.removeItem("publisherdetail");
    this.router.navigate(['/publisher/add'])
  }

  redirectToPage(link: string) {
    if (!link) return '';
    return !(link.startsWith("http://") || link.startsWith("https://")) ? "http://" + link : link;
  }

  gotodetailpage(publisher) {
    this.router.navigate(['/view/' + publisher.id]);
    localStorage.setItem('publisherdetail', JSON.stringify(publisher))
  }

  getPublishers() {
    this.publisherService.getPublisherlist(this.selectedPage, this.pageSize, this.keyword).subscribe(data => {
      this.publisherList = data.response.list;
      this.totalLength = data.response.count;
      this.finalPage = this.selectedPage;
      this.collectionSize = data.response.list.length;
      this.isLoading = false;
    },(error) => {
      this.tostrService.error(error);
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

  removePublisher(publisherId) {
    this.selectedPublisherId = publisherId;
    $('#removePublisherModal').modal('show');
  }

  removePublisherConfirm() {
    $('#removePublisherModal').modal('hide');
    this.publisherService.removePublisher(this.selectedPublisherId).subscribe((data: any) => {
      this.getPublishers();
      if (data.errorMsg === "") {
        this.toastr.success('Publisher Deleted successfully.', 'Success');
        this.ngOnInit();
      } else {
        this.toastr.error(data.errorMsg, 'Failure');
      }
    },(error) => {
      this.tostrService.error(error);
    })
  }

  gotoeditpage(publisher) {
    let id = publisher.id;
    this.router.navigate(['/edit/' + id]);
    localStorage.setItem("publisherdetail", JSON.stringify(publisher));
  }

  gotoviewPage(publisher) {
    let pid = publisher.id;
    this.router.navigate(['/view/' + pid]);
    localStorage.setItem("publisherdetail", JSON.stringify(publisher));
  }

  onChangeGroup(value) {
    this.groupId = value;
  }

  saveDefaultGroup() {
  //   this.publisherService.defaultPublisherGroup(this.selectedPublisherId, this.groupId,).subscribe((data: any) => {
  //     this.groupId = '';
  //     $('#stationModal').modal('hide');
  //     this.toastr.success('Publisher default group updated successfully.', 'Success');
  //     this.ngOnInit();
  //   },(error) => {
  //     this.tostrService.error(error);
  //   });
  }
}
