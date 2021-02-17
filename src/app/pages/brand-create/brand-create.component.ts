import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit {

  creationForm: FormGroup;
  toggleTable: boolean = true;
  constructor(private fb: FormBuilder, private apiService: BrandsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.creationForm = this.fb.group({
      brand_name: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  submitAction(creationForm) {
    this.apiService.newBrands(creationForm).subscribe(resp => {
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

  // private errorHandler(err: any) {
  //   console.log(err);
  //   if (err['error']['status'] == 0) {
  //     this.message = err['error']['message'];
  //     this.openMessageSnackBar(this.message);
  //   }
  // }

}
