import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptUtils } from 'src/app/commons/utils/EncryptUtil';
import { environment } from 'src/environments/environment';
import { AuthenticationUserRequest } from '../../../domain/dto/AuthenticationUserRequest';
import { ILoginService } from '../structural/ILoginService';
import { HttpClientService } from './http-client.service';
import { JwtokenUtilService } from './jwtokenUtil.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements ILoginService {

  private urlCreateUser = environment.backendUrl + environment.createUserPath;
  private urlLoginUser = environment.backendUrl + environment.loginPath;

  constructor(
    private clientHttp: HttpClientService,
    private jwtokenUtilService: JwtokenUtilService

  ) { }


  authenticateUser(username: string, password: string): Observable<any> {
    password = EncryptUtils.encryptToSha256(password);
    return this.clientHttp.post(this.urlLoginUser, this.getAuthenticationUserRequest(username, password));
  }

  createUser(username: string, password: string): Observable<any> {
    password = EncryptUtils.encryptToSha256(password);
    return this.clientHttp.post(this.urlCreateUser, this.getAuthenticationUserRequest(username, password), undefined);
  }

  getAuthenticationUserRequest(username: string, password: string): AuthenticationUserRequest {
    return {
      username,
      password
    }
  }

  logout() {
    if (this.isAuthenticate()) {
      this.jwtokenUtilService.removeToken();
    }
  }

  isAuthenticate(): boolean {
    let token = this.jwtokenUtilService.getToken();
    return !!token;
  }

  getToken(): string {
    return this.jwtokenUtilService.getToken();
  }

  setToken(token?: string) {
    this.jwtokenUtilService.setToken(token);
  }
}
