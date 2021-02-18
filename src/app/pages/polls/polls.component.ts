import { Component, OnInit } from '@angular/core';
import { PollsService } from 'app/services/polls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  pollsData: any;
  pastPollsData: any;

  constructor(private apiService:PollsService, private router:Router ) { }
  ngOnInit(): void {
    this.getPolls();
    this.getPastPolls();
  }
  

  addPollPage() {
    this.router.navigate(['/add-poll']);
  }

  getTime(date)
  {
    date = date.split("T");
    return date[1].split(".")[0];
  }
  //#region Private Methods
  private getPolls() {
    this.apiService.getPolls().subscribe(resp => {
      console.log(resp);
      console.log("polls");
      this.pollsData = resp['data'];
      console.log(this.pollsData);
    });
  }
  private getPastPolls() {
    this.apiService.getPastPolls().subscribe(resp => {
      console.log(resp);
      console.log("past polls");
      this.pastPollsData = resp['data'];
      console.log(this.pastPollsData);
    });
  }
  //#endregion
}
