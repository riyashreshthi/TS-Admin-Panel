import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  totalRecords: String;
  page: Number = 1;
  couponsData: any;
  constructor(private apiService: CouponsService) { }

  ngOnInit(): void {
    this.apiService.coupons().subscribe(resp => {console.log(resp);
      this.couponsData = resp['data'];
      this.totalRecords = this.couponsData.length;
    })
  }

}
