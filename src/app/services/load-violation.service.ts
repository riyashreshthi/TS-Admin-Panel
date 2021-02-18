import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getViolationError, getViolationLoaded, getViolationLoading, RootReducerState } from 'app/reducers';
import { ViolationListErrorAction, ViolationListRequestAction, ViolationListSuccessAction } from 'app/actions/violation-list';
import { getViolations } from 'app/reducers/violation-reducer';
import { combineLatest, Observable } from 'rxjs';
import { DashboardService } from 'app/services/dashboard.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadViolationService {
  constructor(private store: Store<RootReducerState>, private apiService: DashboardService) { }

  getViolationList(force = false, page, limit): [Observable<boolean>, Observable<any>, Observable<boolean> ] {
    console.log(page,"page within violation service")
    console.log(limit,"limit within violation service")
    const loading$ = this.store.select(getViolationLoading);
    const loaded$ = this.store.select(getViolationLoaded);
    const getViolationData$ = this.store.select(getViolations);
    const getViolationError$ = this.store.select(getViolationError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      console.log(data, "data within combine latest in dashboard")
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new ViolationListRequestAction());
        this.apiService.violations(page, limit).subscribe(resp => {
          // this.totalRecords = resp['data'].total_videos_count;
          this.store.dispatch(new ViolationListSuccessAction({data: resp['data']}));
      }, error => {
        this.store.dispatch(new ViolationListErrorAction());
      });
    }
  });
  return [loaded$, getViolationData$, getViolationError$];
  }
}
