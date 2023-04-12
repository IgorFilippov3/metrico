import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MtHttpClientService } from "./mt-http-client.service";

@Injectable()
export class MetricsApiService {

  constructor(private httpService: MtHttpClientService) { }

  collectPageMetrics(apiKey: string, pageId: number): Observable<void> {
    let params: HttpParams = new HttpParams();
    params = params
      .append("apiKey", apiKey)
      .append("pageId", pageId.toString());

    return this.httpService.get<void>("/metrics/hook/one", params);
  }
}