import { Injectable } from '@angular/core';
import { IJwotokenUtil } from '../structural/IJwtokenUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtokenUtilService implements IJwotokenUtil {


  constructor() { }

  setToken(token?: string) {
    localStorage.setItem(environment.authenticationToken, this.validToken(token));
  }

  removeToken() {
    localStorage.removeItem(environment.authenticationToken);
  }

  getToken(): any {
    return localStorage.getItem(environment.authenticationToken);
  }

  validToken(token?: string) {
    if (token !== null && token !== undefined) {
      return token;
    }
    return "";
  }

}
