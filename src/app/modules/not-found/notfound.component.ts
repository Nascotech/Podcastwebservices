import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotFoundComponent implements OnInit {
  token:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('accesstoken')
  }

  gotobackpage()
  {
    if(this.token)
    {
      this.router.navigate(['/dashboard'])
    }
    else
    {
      this.router.navigate(['/'])
    }
  }
}
