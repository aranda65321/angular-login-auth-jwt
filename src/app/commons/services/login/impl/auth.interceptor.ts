import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './login-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('login') && !request.url.includes('register')) {
      let token = this.authService.getToken
      if (!token) {
        return next.handle(request);
      }
      const req = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
      return next.handle(req);
    }
    return next.handle(request);
  }
}
