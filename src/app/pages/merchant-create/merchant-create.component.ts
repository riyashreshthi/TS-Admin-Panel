import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MerchantsService } from '../../services/merchants.service';
import { BrandsService } from 'app/services/brands.service';

@Component({
  selector: 'app-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.css']
})
export class MerchantCreateComponent implements OnInit {
  creationForm: FormGroup;
  toggleTable: boolean = true;
  brandIdSelection: number;
  brandsList: any;
  constructor(private fb: FormBuilder, private apiService: MerchantsService, private apiService2: BrandsService) { }

  ngOnInit(): void {
    this.apiService2.brands().subscribe(resp => {console.log(resp);
      this.brandsList = resp['data'];
    })
    this.creationForm = this.fb.group({
      name: [null, Validators.required],
      logo: [null, Validators.required],
      site: [null, Validators.required],
      person_name: [null, Validators.required],
      person_contact_number: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  brandSelection(e) {
    this.brandIdSelection = e
    console.log(e)
  } 

  submitAction(creationForm) {
    creationForm.brand_id = this.brandIdSelection
    this.apiService.newMerchants(creationForm).subscribe(resp => {
      console.log(resp,"Response")
    },err => {console.log(err,"Errors")})
  }

  back() {
    this.toggleTable = false;
  }

}
