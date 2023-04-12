import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetPageLabDataDto } from "@app/_core/models/get-page-lab-data.dto";
import { LabDataDto } from "@app/_core/models/lab-data.dto";
import { PageDto } from "@app/_core/models/page.dto";
import { MtHttpClientService } from "./mt-http-client.service";
import { GetPageFieldDataDto } from "../models/get-page-field-data.dto";
import { FieldDataDto } from "../models/field-data.to";
import { PagesListViewRequest } from "../models/pages-list/pages-list-view-request.model";
import { MetricDataType } from "../models/metric-data-type.enum";
import { CreatePageDto } from "@app/main-site/control-panel/pages/add-page/models/create-page.dto";
import { UpdatePageDto } from "@app/main-site/control-panel/pages/page-details/models/update-page.dto";
import { DeviceType } from "../models/device-type.enum";

@Injectable()
export class PagesApiService {

  constructor(
    private httpService: MtHttpClientService
  ) {}

  getUserPages(viewRequest: PagesListViewRequest): Observable<PageDto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("dataType", MetricDataType.ALL);

    const offset: number = (viewRequest.page - 1) * viewRequest.pageSize;
    params = params.set("offset", offset.toString());
    params = params.set("limit", viewRequest.pageSize.toString());

    return this.httpService.get<PageDto[]>("/pages", params);
  }

  getUserPagesCount(): Observable<number> {
    let params: HttpParams = new HttpParams();
    params = params.append("dataType", MetricDataType.ALL);

    return this.httpService.get<number>("/pages/count", params);
  }

  getUserPage(pageID: number): Observable<PageDto> {
    const path: string = "/pages/{pageID}".replace(/{pageID}/, pageID.toString());
    return this.httpService.get<PageDto>(path);
  }

  createPage(dto: CreatePageDto): Observable<PageDto> {
    return this.httpService.post<PageDto>("/pages", dto);
  }

  updatePage(pageID: number, updatePageDto: UpdatePageDto): Observable<PageDto> {
    const path: string = "/pages/{pageID}".replace(/{pageID}/, pageID.toString());
    return this.httpService.put<PageDto>(path, updatePageDto);
  }

  deletePage(pageID: number): Observable<void> {
    const path: string = "/pages/{pageID}".replace(/{pageID}/, pageID.toString());
    return this.httpService.delete<void>(path);
  }

  getPageData(pageId: number): Observable<PageDto> {
    return this.httpService.get<PageDto>(`/pages/${pageId}`);
  }

  getPageLabData({ pageId, deviceType, from, to}: GetPageLabDataDto): Observable<LabDataDto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("deviceType", deviceType);
    params = params.append("from", from);
    params = params.append("to", to);

    return this.httpService.get<LabDataDto[]>(`/pages/lab-data/${pageId}`, params);
  }

  getPageLabDataReport(pageId: number, deviceType: DeviceType) {
    let params: HttpParams = new HttpParams();
    params = params.append("deviceType", deviceType);

    return this.httpService.get<any>(`/pages/lab-data-report/${pageId}`, params);
  }

  getPageFieldData({
    pageId,
    deviceType,
    from,
    to
  }: GetPageFieldDataDto): Observable<FieldDataDto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("deviceType", deviceType);
    params = params.append("from", from);
    params = params.append("to", to);

    return this.httpService.get<FieldDataDto[]>(`/pages/field-data/${pageId}`, params);
  }
}