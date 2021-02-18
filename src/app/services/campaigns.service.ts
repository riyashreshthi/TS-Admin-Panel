import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  endPoint = 'campaign/';
  endPoint1 = 'city/';
  endPoint2 = 'campaign-type/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  campaigns(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint , this.httpOptions);
  }

  newCampaigns(newCampaign): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + this.endPoint , newCampaign, this.httpOptions);
  }

  updatedCampaigns(updatedCampaign, id): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint + id, updatedCampaign, this.httpOptions);
  }

  city(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint1 , this.httpOptions);
  }

  campaignType(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint2 , this.httpOptions);
  }
}
