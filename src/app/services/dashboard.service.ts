import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  endPoint = 'violation';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };


  constructor(private http: HttpClient) { }

  violations(page, pageOptions): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint + '?page='+ page +'&limit='+ pageOptions , this.httpOptions);
  }

}
