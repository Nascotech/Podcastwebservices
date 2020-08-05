import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  isLoading = true;
  sidebar1: any;
  sidebar2: any;
  sidebar3: any;
  sidebar4: any;
  leaderboard1: any;
  modalTitle: any;
  settingsForm: FormGroup;
  submitted = false;
  errorMessage: string;
  validationMessage = [];
  displaysidebar1: boolean = false;
  displaysidebar2: boolean = false;
  displaysidebar3: boolean = false;
  displaysidebar4: boolean = false;
  displayleaderboard: boolean = false;
  constructor(private authService: AuthService,
    private tostrService: ToastrService,
    private fb: FormBuilder,
    private router: Router) {
    this.settingsForm = this.fb.group({
      sidebar1: [''],
      sidebar2: [''],
      sidebar3: [''],
      sidebar4: [''],
      leaderboard1: ['']
    })
  }

  ngOnInit(): void {
    this.getSettingsValues();
  }



  getSettingsValues() {
    this.authService.getSettingskeys().subscribe((data: any) => {
      this.sidebar1 = window.atob(data.response.sidebar1)
      this.sidebar2 = window.atob(data.response.sidebar2);
      this.sidebar3 = window.atob(data.response.sidebar3);
      this.sidebar4 = window.atob(data.response.sidebar4);
      this.leaderboard1 = window.atob(data.response.leaderboard1);
      this.isLoading = false;
    },
      (error) => {
        this.tostrService.error(error);
      })
  }

  opensidebar1editModal() {
    this.displaysidebar1 = true;
    this.displaysidebar2 = false;
    this.displaysidebar3 = false;
    this.displaysidebar4 = false;
    this.displayleaderboard = false;
    $('#editModal').modal('show');
    this.settingsForm.controls['sidebar1'].setValue(this.sidebar1)
  }

  opensidebar2editModal() {
    this.displaysidebar2 = true;
    this.displaysidebar1 = false;
    this.displaysidebar3 = false;
    this.displaysidebar4 = false;
    this.displayleaderboard = false;
    $('#editModal').modal('show');
    this.settingsForm.controls['sidebar2'].setValue(this.sidebar2)
  }

  opensidebar3editModal() {
    this.displaysidebar3 = true;
    this.displaysidebar1 = false;
    this.displaysidebar2 = false;
    this.displaysidebar4 = false;
    this.displayleaderboard = false;
    $('#editModal').modal('show');
    this.settingsForm.controls['sidebar3'].setValue(this.sidebar3)
  }

  opensidebar4editModal() {
    this.displaysidebar4 = true;
    this.displaysidebar1 = false;
    this.displaysidebar2 = false;
    this.displaysidebar3 = false;
    this.displayleaderboard = false;
    $('#editModal').modal('show');
    this.settingsForm.controls['sidebar4'].setValue(this.sidebar4)
  }

  openleaderboardeditModal() {
    this.displaysidebar3 = false;
    this.displaysidebar4 = false;
    this.displaysidebar2 = false;
    this.displaysidebar1 = false;
    this.displayleaderboard = true;
    $('#editModal').modal('show');
    this.settingsForm.controls['leaderboard1'].setValue(this.leaderboard1);
  }

  gotobackpage() {
    this.router.navigate(['/dashboard'])
  }

  saveSettingsValue() {
    this.submitted = true;
    if (this.settingsForm.invalid) {
      return;
    }
    else {
      const data = {
        sidebar1: btoa(this.removeProtocol(this.settingsForm.get('sidebar1').value)),
        sidebar2: btoa(this.removeProtocol(this.settingsForm.get('sidebar2').value)),
        sidebar3: btoa(this.removeProtocol(this.settingsForm.get('sidebar3').value)),
        sidebar4: btoa(this.removeProtocol(this.settingsForm.get('sidebar4').value)),
        leaderboard1: btoa(this.removeProtocol(this.settingsForm.get('leaderboard1').value))
      }
      this.authService.saveSettingsKeys(data).subscribe((data: any) => {
        this.submitted = false;
        if (data.errorMsg === "") {
          $('#editModal').modal('hide');
          this.tostrService.success('record edited successfully.', 'Success');
          this.getSettingsValues()
        } else if (data.errorMsg === "ValidationError") {
          let messages = data.response.message;
          if (messages.length > 1) {
            this.validationMessage = messages;
          } else {
            this.errorMessage = data.response.message;
          }
        } else {
          this.errorMessage = data.errorMsg;
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.submitted = false;
          this.errorMessage = "Server can't be connect try again.";
        } else if (error.status === 401) {
          this.submitted = false;
        } else {
          // this.errorMessage = error.error.errorMsg;
        }
      })
    }
  }

  removeProtocol(script) {
    let str1 = script.replace("http:", "");
    return str1.replace("https:", "");
  }
}
