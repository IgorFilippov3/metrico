import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CodeCoverageDetails } from "../models/code-coverage-details.model";
import { CodeCoverageDto } from "../models/code-coverage.dto";
import { DeviceType } from "../models/device-type.enum";

import { GetPageCodeCoverageDataDto } from "../models/get-page-code-coverage-data.model";
import { MtHttpClientService } from "./mt-http-client.service";

@Injectable()
export class CodeCoverageApiService {

  constructor(
    private httpService: MtHttpClientService
  ) {}

  getCodeCoverages({ pageId, deviceType, from, to }: GetPageCodeCoverageDataDto): Observable<CodeCoverageDto[]> {
    let params = new HttpParams();
    params = params.append("deviceType", deviceType);
    params = params.append("from", from);
    params = params.append("to", to);

    return this.httpService.get(`/pages/code-coverage/${pageId}`, params);
  }

  getCodeCoveragesDetails(pageId: number, deviceType: DeviceType): Observable<CodeCoverageDetails[]> {
    let params = new HttpParams();
    params = params.append("deviceType", deviceType);

    return this.httpService.get(`/pages/code-coverage-details/${pageId}`, params);
  }
}