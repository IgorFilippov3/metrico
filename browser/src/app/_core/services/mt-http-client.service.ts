import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable()
export class MtHttpClientService {
  private serverAddress: string = environment.serverAddress + environment.apiAddress;

  constructor(private httpClient: HttpClient) {}

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(this.serverAddress + path, {
      withCredentials: true,
      observe: "body",
      responseType: "json",
      params: params
    })
  }

  post<T>(path: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.post<T>(this.serverAddress + path, body, {
      withCredentials: true,
      observe: "body",
      responseType: "json",
      params: params
    });
  }

  put<T>(path: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.put<T>(this.serverAddress + path, body, {
      withCredentials: true,
      observe: "body",
      responseType: "json",
      params: params
    });
  }

  delete<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(this.serverAddress + path, {
      withCredentials: true,
      observe: "body",
      responseType: "json",
      params: params
    });
  }
  
}