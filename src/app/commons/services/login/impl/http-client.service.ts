import { Injectable } from '@angular/core';
import { IHttpClient } from '../structural/IHttpClient';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements IHttpClient {


  constructor(private httpClient: HttpClient) { }

  post(url: string, data: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.post(url, data, { headers: headers })
  }

  get(url: string, headers: any, httpParams: HttpParams): Observable<any> {
    return this.httpClient.get(url, { headers: headers, params: httpParams });
  }

  put(url: string, data: any, headers: HttpHeaders): Observable<any> {
    return this.httpClient.put(url, data, { headers: headers });
  }

  delete(url: string, headers: HttpHeaders, params: HttpParams): Observable<any> {
    return this.httpClient.delete(url, { headers: headers, params: params })
  }
}
