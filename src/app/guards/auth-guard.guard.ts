import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../guards/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private route: Router,
    private guardService: AuthServiceService) {}

    canActivate(): boolean {
      if (this.guardService.loggedIn()) {
        return true;
      } else {
        this.route.navigate(['/login'])
        return false;
      }
    }
  
}
