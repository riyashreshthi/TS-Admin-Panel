import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LuckyDrawService } from 'app/services/lucky-draw.service';

@Component({
  selector: 'app-lucky-draw-view',
  templateUrl: './lucky-draw-view.component.html',
  styleUrls: ['./lucky-draw-view.component.css']
})
export class LuckyDrawViewComponent implements OnInit {
  @Input() viewDetails;
  toggleTable: boolean = true;
  winnerPrize = [];
  creditAllot;
  prizeIdSelection: number;
  message: string;
  constructor(private apiService: LuckyDrawService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.getPrize().subscribe(resp => {
      this.winnerPrize = resp['data']   ;
    }, err => {
      console.log(err);
    });
  }

  back() {
    this.toggleTable = false;
  }

  prizeSelection(e) {
    this.prizeIdSelection = e
    console.log(e)
  }

  addCredit() {
    this.creditAllot = {
      credit: this.viewDetails.credit,
      user_id: this.viewDetails.user_id,
      referral_made: this.viewDetails.referral_made,
      week_id: this.viewDetails.week_id,
      prize_id: this.prizeIdSelection
    }
    this.apiService.luckyWinner(this.creditAllot).subscribe(resp => {
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    }, err => {
      console.log(err);
      this.errorHandler(err);
    })
  }

  private openSnackBar() {
    this._snackBar.open('Thanks for submitting your response', '', {
      duration: 2000,
    });
  }
  private openMessageSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 2000,
    });
  }

  private errorHandler(err: any) {
    console.log(err);
    if (err['error']['status'] == 0) {
      this.message = err['error']['message'];
      this.openMessageSnackBar(this.message);
    }
  }
}
