import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  totalRecords: String;
  page: Number = 1;
  usersData: any;
  toggleTable: boolean = true;
  obj: any;
  constructor(private apiService: UserService) { }

  ngOnInit(): void {
    this.apiService.users().subscribe(resp => {console.log(resp);
      this.usersData = resp['data'];
      this.totalRecords = this.usersData.length;
    })
  }

  navigateTo(object) {
    this.obj = object;
    this.toggleTable = false;
  }
}
