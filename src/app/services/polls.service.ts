import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  endPoint1 = 'poll/';
  endPoint2 ='poll/past';
  httpWithoutToken;

  constructor(private http: HttpClient) {
    this.httpWithoutToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization' : localStorage.getItem('Authorization')
      })
    };
  }

getPolls()  : Observable<any> {
  return this.http.get<any>(environment.BASE_URL + this.endPoint1 , this.httpWithoutToken);
}
getPastPolls()  : Observable<any> {
  return this.http.get<any>(environment.BASE_URL + this.endPoint2 , this.httpWithoutToken);
}

  addPoll(pollData: any): Observable<any> {
    return this.http
      .post<any>(environment.BASE_URL + this.endPoint1,
        pollData,
        this.httpWithoutToken)
      .pipe(poll => {
        return poll;
      });
  }

}
