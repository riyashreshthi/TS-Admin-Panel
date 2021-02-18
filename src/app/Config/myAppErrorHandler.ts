import { ErrorHandler, Injectable } from "@angular/core";
// import {UNAUTHORIZED,SUCCESS, BAD_REQUEST, FORBIDDEN} from "./http-status-code";
import { Router } from "@angular/router";
// import {ToastsManager, Toast, ToastOptions} from "ng2-toastr";
import { HttpStatusCodes } from './http-status-code';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Log } from './Log';

@Injectable()
export class myAppErrorHandler implements HttpInterceptor {
  // constructor(private router: Router){};

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        Log.d('in the errror' + error)
        let httpErrorCode = error.httpErrorCode;
        switch (httpErrorCode) {
          case HttpStatusCodes.UNAUTHORIZED:
            // this.router.navigateByUrl("/login");
            break;
          case HttpStatusCodes.FORBIDDEN:
            // this.router.navigateByUrl("/unauthorized");
            break;
          case HttpStatusCodes.BAD_REQUEST:
            this.showError(error.message);
            break;
          default:
            this.showError(HttpStatusCodes.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
        }
        return throwError(error);
      })
    )
  }
  public handleError(error: any) {
    console.error(error);

    let httpErrorCode = error.httpErrorCode;
    console.error("Status code" + httpErrorCode);
    switch (httpErrorCode) {
      case HttpStatusCodes.UNAUTHORIZED:
        // this.router.navigateByUrl("/login");
        break;
      case HttpStatusCodes.FORBIDDEN:
        // this.router.navigateByUrl("/unauthorized");
        break;
      case HttpStatusCodes.BAD_REQUEST:
        this.showError(error.message);
        break;
      default:
        this.showError(HttpStatusCodes.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
  }

  private showError(message: string) {
    Log.d('message:' + message)
    //   this.toastManager.error(message, HttpStatusCodes.DEFAULT_ERROR_TITLE, { dismiss: 'controlled'}).then((toast:Toast)=>{
    //           let currentToastId:number = toast.id;
    //           this.toastManager.onClickToast().subscribe(clickedToast => {
    //               if (clickedToast.id === currentToastId) {
    //                   this.toastManager.dismissToast(toast);
    //                   window.location.reload();
    //               }
    //           });
    //       });
  }
}
