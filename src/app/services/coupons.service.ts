import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  endPoint = 'coupons/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  coupons(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint , this.httpOptions);
  }
}
