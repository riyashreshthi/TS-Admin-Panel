import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViolationReviewService {

  endPoint1 = 'violation-review/';
  endPoint2 = 'reject-reason/';
  endPoint3 = 'violation/';
  endPoint4 = 'vehicle/';
  endPoint5 = 'report-video';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization' : localStorage.getItem('Authorization')
    })
  };
  constructor(private http: HttpClient) { }

  violationReview(statusChanged): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint1 , statusChanged, this.httpOptions);
  }

  rejectReason(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint2 , this.httpOptions);
  }

  violations(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint3 , this.httpOptions);
  }

  violationsById(videoId): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint3 + videoId , this.httpOptions);
  }

  updateVehicleNumber(updateVehicleNoRq): Observable<any> {
    return this.http.put<any>(environment.BASE_URL + this.endPoint4 , updateVehicleNoRq, this.httpOptions);
  }

  reportVideo(videoId, vehicleId): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + this.endPoint5 + '?video_id=' + videoId + '&vehicle_id=' + vehicleId, this.httpOptions);
  }
}
