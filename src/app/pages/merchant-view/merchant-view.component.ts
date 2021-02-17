import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BrandsService } from 'app/services/brands.service';
import { MerchantsService } from 'app/services/merchants.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css']
})
export class MerchantViewComponent implements OnInit {
  @Input() viewDetails;
  updationForm: FormGroup;
  toggleTable: boolean = true;
  brandIdSelection: number;
  brandsList: any;
  selected = 0;
  constructor(private fb: FormBuilder, private apiService: BrandsService, private apiService2: MerchantsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updationForm = this.fb.group({
      name: [null, Validators.required],
      logo: [null, Validators.required],
      site: [null, Validators.required],
      person_name: [null, Validators.required],
      person_contact_number: [null, Validators.required],
      address: [null, Validators.required],
      brand_id: [null, Validators.required],
    });
    this.selected = this.viewDetails.brand_id;
    console.log(this.viewDetails.brand_id)
    console.log(this.selected,"Selected value")
    this.apiService.brands().subscribe(resp => {console.log(resp);
      this.brandsList = resp['data'];
    })
    this.updationForm.get('name').setValue(this.viewDetails.name)
    this.updationForm.get('logo').setValue(this.viewDetails.logo)
    this.updationForm.get('site').setValue(this.viewDetails.site)
    this.updationForm.get('person_name').setValue(this.viewDetails.person_name)
    this.updationForm.get('person_contact_number').setValue(this.viewDetails.person_contact_number)
    this.updationForm.get('address').setValue(this.viewDetails.address)
    // const brand = this.brandsList.map(b => b.brand_name === this.viewDetails.name.toLocaleLowerCase());
    // const brand = this.brandsList.find(b => b.id == this.viewDetails.brand_id)
    // console.log(brand,"brand after filer")
    this.updationForm.get('brand_id').setValue(this.viewDetails.brand_id);
  }

  submitAction() {
    this.apiService2.updatedMerchants(this.updationForm.value, this.viewDetails.id).subscribe(resp => {
      console.log(resp,"Response")
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    },err => {console.log(err,"Errors")})
    console.log(this.updationForm.value,"updated form data")
  }

  brandSelection(e) {
    this.brandIdSelection = e
    console.log(e)
  } 

  back() {
    this.toggleTable = false;
  }

  private openSnackBar() {
    this._snackBar.open('Thanks for submitting your response', '', {
      duration: 2000,
    });
  }
}
