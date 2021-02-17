import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  searchForm: FormGroup;
  obj: any;
  offenceData: any;
  message: string;
  totalRecords: String;
  page: Number = 1;
  pageOptions: Number = 10;
  keySelected: any;
  searchedItem: any;
  searchArray = [];
  searchTerm = {
    key: this.keySelected,
    value: null
  };
   
  filteredData: any;
  offenceModerationStatus = new Map<string, any>();

  constructor(private apiService: DashboardService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const pageKey = sessionStorage.getItem('page');
    if(pageKey && pageKey != '1') {
      const limitKey = sessionStorage.getItem('limit');
      this.apiService.violations(pageKey, limitKey).subscribe(resp => {
        this.offenceData = resp['data']['videos'];
        // this.filteredData = this.offenceData;
        this.totalRecords = resp['data'].total_videos_count;
        // this.setModerationStatus(this.offenceData);
      });
    } else {
      sessionStorage.setItem('page', '1');
      sessionStorage.setItem('limit', '10');
      this.apiService.violations(this.page, this.pageOptions).subscribe(resp => {
        this.offenceData = resp['data']['videos'];
        this.totalRecords = resp['data'].total_videos_count;
      });
    }
    this.searchForm = this.fb.group({
      key: [null, Validators.required],
      value: [null, Validators.required]
    });
  }
  getPage(page) {
    this.page = page;
      sessionStorage.setItem('page', JSON.stringify(this.page));
      sessionStorage.setItem('limit', JSON.stringify(this.pageOptions));
      const pageKey = sessionStorage.getItem('page');
      const LimitKey = sessionStorage.getItem('limit');
      this.apiService.violations(pageKey, LimitKey).subscribe(resp => {
        this.offenceData = resp['data']['videos'];
        this.totalRecords = resp['data'].total_videos_count;
        // this.setModerationStatus(this.offenceData);
      });
  }

  onOptionsChange(e) {
    this.pageOptions = e;
  }

  onFlitersChange(e) {
    this.searchTerm.key = e;
  }
  // setModerationStatus(offenceData)
  // {
  //   console.log(offenceData,"Offence data for moderation")
  //   offenceData.videos.forEach(video => {
  //   var count =0;
  //   var violationLength =0;
  //   video.videos.forEach(x => {
  //     if(x.is_generated == false) {
  //       violationLength++;
  //       if(x.status == 2 || x.status ==3) {
  //         count++;
  //       }
  //     }
  //     });
  //     this.setNotTouched(count,video);
  //     this.setPartiallyModerated(count, video,violationLength);
  //     this.setAllModerated(count,video, violationLength);
  //    });
  // }
    
  // getStatus(data) {
  //   return this.offenceModerationStatus.get(data.meta_violation_id);
  // }
  search() {
    if (this.searchTerm.key === 'city') {
      this.searchedItem = this.offenceData.filter(c => c.city.toLocaleLowerCase() === this.searchTerm.value.toLocaleLowerCase());
      if (this.searchedItem) {
        this.offenceData = this.searchedItem;
        this.totalRecords = this.offenceData.total_videos_count;
      } else {
        this.message = 'No records found'
      }
    } else if (this.searchTerm.key === 'email') {
      this.searchedItem = this.offenceData.filter(c => c.email.toLocaleLowerCase() === this.searchTerm.value.toLocaleLowerCase());
      if (this.searchedItem) {
        this.offenceData = this.searchedItem;
        this.totalRecords = this.offenceData.total_videos_count;
      } else {
        this.message = 'No records found'
      }
    } else if (this.searchTerm.key === 'name') {
      this.searchedItem = this.offenceData.filter(c => c.name.toLocaleLowerCase() === this.searchTerm.value.toLocaleLowerCase());
      if (this.searchedItem) {
        this.offenceData = this.searchedItem;
        this.totalRecords = this.offenceData.total_videos_count;
      } else {
        this.message = 'No records found'
      }
    }
  }

  //#region Private Methods
//   setNotTouched(count,video) {
//   if(count == 0) {
//     this.offenceModerationStatus.set(video.meta_violation_id,"red");
//   }
// }
// setPartiallyModerated(count,video, violationLength) {
//    if(count< violationLength && count!= 0) {   
//     this.offenceModerationStatus.set(video.meta_violation_id,"orange");
//   }
// }
// setAllModerated(count,video,violationLength) {
//   if(count == violationLength) {
//   this.offenceModerationStatus.set(video.meta_violation_id,"green");
//   }
// }

// ViewPage(metaViolationId) {
//   this.router.navigate(['/violation-review']);
// }


//#endregion

}
