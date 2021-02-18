import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'app/services/campaigns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaignsData: any;
  obj: any;
  toggleTable: boolean = true;
  constructor(private apiService: CampaignsService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.campaigns().subscribe(resp => {console.log(resp);
      this.campaignsData = resp['data'];
    })
  }

  navigateTo(object) {
    this.obj = object;
    this.toggleTable = false;
  }

  createCampaign() {
    this.router.navigate(['/campaign-create']);
    this.toggleTable = false;
  }
}
