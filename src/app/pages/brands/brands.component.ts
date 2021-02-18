import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'app/services/brands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  toggleTable: boolean = true;
  obj: any;
  brandsData: any;
  constructor(private apiService: BrandsService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.brands().subscribe(resp => {console.log(resp);
      this.brandsData = resp['data'];
    })
  }

  navigateTo(object) {
    this.obj = object;
    this.toggleTable = false;
  }

  createBrand() {
    this.router.navigate(['/brand-create']);
    this.toggleTable = false;
  }
}
