import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadViolationService } from 'app/services/load-violation.service'
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
  index: -1;
  loading = false;
  error = false;
   
  filteredData: any;
  offenceModerationStatus = new Map<string, any>();

  constructor(private fb: FormBuilder,
    private router: Router, private loadViolation: LoadViolationService) { }

  ngOnInit(): void {
    const pageKey = sessionStorage.getItem('page');
    if(pageKey && pageKey != '1') {
      console.log("within if condition")
      const limitKey = sessionStorage.getItem('limit');
      console.log(pageKey,"Page key")
      console.log(limitKey,"Limit key")
      const violationData$ = this.loadViolation.getViolationList(false, pageKey, limitKey)[1]
      violationData$.subscribe(data => {
        for (const v of data['violations']) {
          this.totalRecords = v.total_videos_count
          this.offenceData = v['videos'];
        }
      })
      // const observer$ = this.loadViolation.getViolationList(true, pageKey, limitKey)
      // const violationData$ = observer$[1];
      // const loading$ = observer$[0];
      // const error$ = observer$[2];
      // violationData$.subscribe(data => {
      //   for(const v of data['violations']) {
      //     this.totalRecords = v.total_videos_count
      //     this.offenceData = v['videos'];
      //   }
      // })
      // loading$.subscribe(data => {
      //   this.loading = data;
      // })
      // error$.subscribe(data => {
      //   this.error = data;
      // })
    } else {
      console.log("within else condition")
      sessionStorage.setItem('page', '1');
      sessionStorage.setItem('limit', '10');
      console.log(this.page,"Page key")
      console.log(this.pageOptions,"Limit key")
      const violationData$ = this.loadViolation.getViolationList(false, this.page, this.pageOptions)[1]
      violationData$.subscribe(data => {
        for(const v of data['violations']) {
          this.totalRecords = v.total_videos_count
          this.offenceData = v['videos'];
        }
      })
      // const observer$ = this.loadViolation.getViolationList(true, pageKey, limitKey)
      // const violationData$ = observer$[1];
      // const loading$ = observer$[0];
      // const error$ = observer$[2];
      // violationData$.subscribe(data => {
      //   for(const v of data['violations']) {
      //     this.totalRecords = v.total_videos_count
      //     this.offenceData = v['videos'];
      //   }
      // })
      // loading$.subscribe(data => {
      //   this.loading = data;
      // })
      // error$.subscribe(data => {
      //   this.error = data;
      // })
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
      console.log("within get page function");
      const pageKey = sessionStorage.getItem('page');
      const LimitKey = sessionStorage.getItem('limit');
      console.log(pageKey,"Page key")
      console.log(LimitKey,"Limit key")
      const violationData$ = this.loadViolation.getViolationList(false, pageKey, LimitKey)[1]
      violationData$.subscribe(data => {
        for(const v of data['violations']) {
          this.totalRecords = v.total_videos_count
          this.offenceData = v['videos'];
        }
      })
  }

  onOptionsChange(e) {
    this.pageOptions = e;
  }

  onFlitersChange(e) {
    this.searchTerm.key = e;
  }

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
