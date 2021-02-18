import { Component, OnInit } from '@angular/core';
import { MerchantsService } from 'app/services/merchants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {
  toggleTable: boolean = true;
  obj: any;
  merchantsData: any;
  constructor(private apiService: MerchantsService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.merchants().subscribe(resp => {console.log(resp);
      this.merchantsData = resp['data'];
    })
  }

  navigateTo(object) {
    this.obj = object;
    this.toggleTable = false;
  }

  createMerchant() {
    this.router.navigate(['/merchant-create']);
    this.toggleTable = false;
  }
}
