import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endPoint1 = 'admin-login/';
  endPoint2 = 'admin-register/';
  httpWithoutToken;

  constructor(private http: HttpClient) {
    this.httpWithoutToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
  }

login(userData: any): Observable<any> {
    return this.http
      .post<any>(environment.BASE_URL + this.endPoint1,
        userData,
        this.httpWithoutToken)
      .pipe(user => {
        return user;
      });
  }

  register(newuserData: any): Observable<any> {
    return this.http
      .post<any>(environment.BASE_URL + this.endPoint2,
        newuserData,
        this.httpWithoutToken)
      .pipe(user => {
        return user;
      });
  }
}


