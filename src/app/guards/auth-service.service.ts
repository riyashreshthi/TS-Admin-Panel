import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  loggedIn() {
    const token = localStorage.getItem('Authorization');
    const tokenInfo = this.getDecodedAccessToken(token);
    const tokenExpiry = tokenInfo.exp;
    const epochNow = Math.floor((new Date).getTime() / 1000);
    if (tokenExpiry > epochNow) {
      return token
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }
}

