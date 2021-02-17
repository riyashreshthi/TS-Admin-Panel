import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {
  endPoint = 'merchant/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  merchants(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint , this.httpOptions);
  }

  newMerchants(newMerchant): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + this.endPoint , newMerchant, this.httpOptions);
  }

  updatedMerchants(updatedMerchant, id): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint + id, updatedMerchant, this.httpOptions);
  }
}
