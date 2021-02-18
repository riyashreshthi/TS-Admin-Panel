import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LuckyDrawService {
  endPoint1 = 'lucky-draw/';
  endPoint2 = 'prize/';
  endPoint3 = 'reward-credit/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  luckyDraw(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint1 , this.httpOptions);
  }

  luckyWinner(winner): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + this.endPoint3 , winner, this.httpOptions);
  }

  getPrize(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint2 , this.httpOptions);
  }
}
