import { MtHttpClientService } from "@app/_core/services/mt-http-client.service";
import { Observable } from "rxjs";
import { CreateUserDto } from "@app/auth/models/create-user.dto";
import { Injectable } from "@angular/core";
import { LoginUserDto } from "@app/auth/models/login-user.dto";
import { HttpParams } from "@angular/common/http";
import { Subscription } from "../models/subscription.enum";

@Injectable()
export class AuthApiService {
  constructor(private httpClient: MtHttpClientService) {}

  createUser(dto: CreateUserDto): Observable<void> {
    return this.httpClient.post("/users", dto);
  }

  getGoogleOAuthUrl(subscription?: Subscription): Observable<{ url: string }> {
    let params: HttpParams = new HttpParams();
    if (subscription) params = params.append("subscription", subscription);
    
    return this.httpClient.get<{ url: string }>("/google/auth/url", params);
  }

  login(dto: LoginUserDto): Observable<void> {
    return this.httpClient.post("/auth/login", dto);
  }

  logout(): Observable<void> {
    return this.httpClient.get("/auth/logout");
  }

  confirmEmail(hash: string): Observable<void> {
    return this.httpClient.get(`/auth/confirm/${hash}`);
  }
}