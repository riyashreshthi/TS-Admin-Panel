import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.css']
})
export class BrandViewComponent implements OnInit {
  @Input() viewDetails;
  updationForm: FormGroup;
  toggleTable: boolean = true;
  constructor(private fb: FormBuilder, private apiService: BrandsService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updationForm = this.fb.group({
      brand_name: [null, Validators.required],
      category: [null, Validators.required]
    });
    this.updationForm.get('brand_name').setValue(this.viewDetails.brand_name)
    this.updationForm.get('category').setValue(this.viewDetails.category)
  }

  submitAction() {
    this.apiService.updatedBrands(this.updationForm.value, this.viewDetails.id ).subscribe(resp => {
      console.log(resp,"Response")
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    },err => {console.log(err,"Errors")})
  }  

  back() {
    this.toggleTable = false;
  }

  private openSnackBar() {
    this._snackBar.open('Thanks for submitting your response', '', {
      duration: 2000,
    });
  }
  // private openMessageSnackBar(msg) {
  //   this._snackBar.open(msg, '', {
  //     duration: 2000,
  //   });
  // }

}
