import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Log } from 'app/Config/Log';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  disabled: boolean = true;
  message: string;
  auth = [];
  login = {
    email: null,
    password: null
  }
  constructor(private apiService: LoginService, private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  addUser(Userprofile) {
    this.apiService.login(Userprofile).subscribe(resp => {
      Log.d('response' + resp);
      if (resp['status'] == 1) {
        localStorage.setItem('Authorization', resp['data']['token']);
        this.navigate();
      }
    }, err => {
      console.log(err);
      if (err['error']['status'] == 0) {
        this.message = err['error']['message'];
        this.openMessageSnackBar(this.message)
      }
    });
  }

  navigate(): void {
    this.router.navigate(['/dashboard']);
  }

openMessageSnackBar(msg) {
  this._snackBar.open(msg, 'X', {
    duration: 2000,
  });
}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
