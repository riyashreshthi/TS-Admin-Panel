import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  endPoint = 'brand/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  brands(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint , this.httpOptions);
  }

  newBrands(newBrand): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + this.endPoint , newBrand, this.httpOptions);
  }

  updatedBrands(updatedBrand, id): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint + id, updatedBrand, this.httpOptions);
  }
}
