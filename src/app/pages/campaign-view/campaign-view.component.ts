import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CampaignsService } from '../../services/campaigns.service';
import { MerchantsService } from '../../services/merchants.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {

  @Input() viewDetails;
  updationForm: FormGroup;
  toggleTable: boolean = true;
  merchantList = [];
  campaignTypeList = [];
  cityList = [];
  city_selected: any;
  campaign_type_selected: any;
  merchant_selected: any;
  cityIdSelection;
  campaignTypeIdSelection;
  merchantIdSelection;
  constructor(private fb: FormBuilder, private apiService: CampaignsService, private apiService2: MerchantsService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.city().subscribe(resp => {
      console.log(resp);
      this.cityList = resp['data']
    });
    this.apiService.campaignType().subscribe(resp => {
      console.log(resp);
      this.campaignTypeList = resp['data']
    });
    this.apiService2.merchants().subscribe(resp => {
      console.log(resp);
      this.merchantList = resp['data']
    });
    this.updationForm = this.fb.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      expiry: [null, Validators.required],
      details: [null, Validators.required],
      how_to_redeem: [null, Validators.required],
      terms_and_conditions: [null, Validators.required],
      min_credits_req: [null, Validators.required],
      no_of_coupons: [null, Validators.required],
      daily_limit: [null, Validators.required],
      overall_limit: [null, Validators.required],
      city_id: [null, Validators.required],
      campaign_type_id: [null, Validators.required],
      merchant_id: [null, Validators.required],
    });

    this.updationForm.get('title').setValue(this.viewDetails.title)
    this.updationForm.get('subtitle').setValue(this.viewDetails.subtitle)
    this.updationForm.get('expiry').setValue(this.viewDetails.expiry)
    this.updationForm.get('details').setValue(this.viewDetails.details)
    this.updationForm.get('how_to_redeem').setValue(this.viewDetails.how_to_redeem)
    this.updationForm.get('terms_and_conditions').setValue(this.viewDetails.terms_and_conditions)
    this.updationForm.get('min_credits_req').setValue(this.viewDetails.min_credits_req)
    this.updationForm.get('no_of_coupons').setValue(this.viewDetails.no_of_coupons)
    this.updationForm.get('daily_limit').setValue(this.viewDetails.daily_limit)
    this.updationForm.get('overall_limit').setValue(this.viewDetails.overall_limit)
    this.updationForm.get('city_id').setValue(this.viewDetails.city_id)
    this.updationForm.get('campaign_type_id').setValue(this.viewDetails.campaign_type_id)
    this.updationForm.get('merchant_id').setValue(this.viewDetails.merchant_id)
  }

  submitAction() {
    this.apiService.updatedCampaigns(this.updationForm.value, this.viewDetails.id).subscribe(resp => {
      console.log(resp,"Response")
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    },err => {console.log(err,"Errors")})
    console.log(this.updationForm,"updated form data")
  }

  citySelection(e) {
    this.cityIdSelection = e;
  }

  campaignSelection(e) {
    this.campaignTypeIdSelection = e;
  }

  merchantSelection(e) {
    this.merchantIdSelection = e;
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
