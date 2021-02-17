import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input() viewDetails;
  updationForm: FormGroup;
  toggleTable: boolean = true;
  constructor(private fb: FormBuilder, private apiService: UserService) { }

  ngOnInit(): void {
    this.updationForm = this.fb.group({
      available_credits: [null, Validators.required]
    });
  }

  submitAction(updationForm) {
    this.apiService.updatedUser(updationForm, this.viewDetails.id ).subscribe(resp => {
      console.log(resp,"Response")
    },err => {console.log(err,"Errors")})
    console.log(updationForm,"updated form data")
  }

  back() {
    this.toggleTable = false;
  }

}
