import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CampaignsService } from '../../services/campaigns.service';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  creationForm: FormGroup;
  toggleTable: boolean = true;
  constructor(private fb: FormBuilder, private apiService: CampaignsService) { }

  ngOnInit(): void {
    this.creationForm = this.fb.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      expiry: [null, Validators.required],
      details: [null, Validators.required],
      how_to_redeem: [null, Validators.required],
      terms_and_conditions: [null, Validators.required],
      min_credits_req: [null, Validators.required],
      no_of_coupon: [null, Validators.required],
      daily_limit: [null, Validators.required],
      overall_limit: [null, Validators.required],
    });
  }

  submitAction(creationForm) {
    // this.apiService.newCampaigns(creationForm).subscribe(resp => {
    //   console.log(resp,"Response")
    // },err => {console.log(err,"Errors")})
    console.log(creationForm,"created form data")
  }
  
  back() {
    this.toggleTable = false;
  }

}
