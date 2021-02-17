import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgxPaginationModule } from 'ngx-pagination'
import { AgmCoreModule } from '@agm/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { ViolationReviewComponent } from 'app/pages/violation-review/violation-review.component';
import { UserComponent } from 'app/pages/user/user.component';
import { BrandsComponent } from 'app/pages/brands/brands.component';
import { CampaignsComponent } from 'app/pages/campaigns/campaigns.component';
import { CouponsComponent } from 'app/pages/coupons/coupons.component';
import { AddPollComponent } from 'app/pages/add-poll/add-poll.component';
import { PollsComponent } from 'app/pages/polls/polls.component';
import { LuckyDrawComponent } from 'app/pages/lucky-draw/lucky-draw.component';
import { LuckyDrawViewComponent } from 'app/pages/lucky-draw-view/lucky-draw-view.component';
import { CampaignViewComponent } from 'app/pages/campaign-view/campaign-view.component';
import { CampaignCreateComponent } from 'app/pages/campaign-create/campaign-create.component';
import { BrandViewComponent } from 'app/pages/brand-view/brand-view.component';
import { BrandCreateComponent } from 'app/pages/brand-create/brand-create.component';
import { MerchantsComponent } from 'app/pages/merchants/merchants.component';
import { MerchantViewComponent } from 'app/pages/merchant-view/merchant-view.component';
import { MerchantCreateComponent } from 'app/pages/merchant-create/merchant-create.component';
import { UserViewComponent } from 'app/pages/user-view/user-view.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvIYVXLgmZUFSuBJhW5JFtUA15x1Ym0Qk'
    })
  ],
  declarations: [
    DashboardComponent,
    ViolationReviewComponent,
    UserComponent,
    BrandsComponent,
    CampaignsComponent,
    CouponsComponent,
    AddPollComponent,
    PollsComponent,
    LuckyDrawComponent,
    LuckyDrawViewComponent,
    CampaignViewComponent,
    CampaignCreateComponent,
    BrandViewComponent,
    BrandCreateComponent,
    MerchantsComponent,
    MerchantViewComponent,
    MerchantCreateComponent,
    UserViewComponent
  ]
})

export class AdminLayoutModule { }
