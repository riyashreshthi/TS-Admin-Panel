import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'app/Config/Log';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  disabled: boolean = true;
  message: string;
  auth = [];
  register = {
    name: null,
    email: null,
    password: null
  }
  constructor(private apiService: LoginService, private router: Router, private fb: FormBuilder) { }

  newUser(Userprofile) {
    this.apiService.register(Userprofile).subscribe(resp => {
      Log.d('response' + resp);
      // if (resp['status_code'] == 400) {
      //   for (let i = 0; i < resp['error'].length; i++ ) {
      //     if (resp['error'].length < 2) {
      //       this.message = resp['error'][0]['msg'];
      //     } else {
      //       this.message = 'Please enter username and password'
      //     }
      //   }
      // } else if (resp['status_code'] == 204) {
      //   this.message = 'Wrong username and password';
      // } else 
      // if (resp['status_code'] == 200) {
      //   localStorage.setItem('Authorization', resp['data']['token']);
      // this.auth = resp['data']['token'];
      // this.navigate();
      // }
    }, err => {console.log(err);
    });
  }

  navigate(): void {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
