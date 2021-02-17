import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint = 'profile/';
  endPoint1 = 'user/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  users(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint , this.httpOptions);
  }

  updatedUser(updatedBrand, id): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint1 + '/' + id, updatedBrand, this.httpOptions);
  }
}
