import { Component, OnInit } from '@angular/core';
import { LuckyDrawService } from 'app/services/lucky-draw.service';

@Component({
  selector: 'app-lucky-draw',
  templateUrl: './lucky-draw.component.html',
  styleUrls: ['./lucky-draw.component.css']
})
export class LuckyDrawComponent implements OnInit {
  toggleTable: boolean = true;
  participantsData: any;
  obj: any;
  constructor(private apiService: LuckyDrawService) { }

  ngOnInit(): void {
    this.apiService.luckyDraw().subscribe(resp => {
      this.participantsData = resp['data'];
    })
  }

  navigateTo(object) {
    this.obj = object;
    this.toggleTable = false;
  }

}
