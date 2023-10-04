import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IHttpClient {
  post(url: string, data: any, headers: HttpHeaders): Observable<any>;
  get(url: string, headers: any, httpParams: HttpParams): Observable<any>;
  put(url: string, data: any, headers: HttpHeaders): Observable<any>;
  delete(url: string, headers: HttpHeaders, params: HttpParams): Observable<any>;
}
