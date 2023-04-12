import { MetricDataType } from "../metric-data-type.enum";

export class PagesListViewRequest {
  page: number = 1;
  pageSize: number = 6;
  dataType: MetricDataType = MetricDataType.ALL;
}