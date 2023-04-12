import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { MetricsService } from "./metrics.service";

@Controller("metrics")
export class MetricsController {

  constructor(
    private metricsService: MetricsService,
  ) {}

  @Get("/hook/one")
  collectPageMetrics(
    @Query("apiKey") apiKey: string,
    @Query("pageId", ParseIntPipe) pageId: number,
    @Query("comment") comment: string,
  ) {
    return this.metricsService.collectPageMetrics(apiKey, pageId, comment);
  }

  @Get("/hook/all")
  collectAllPagesMetrics(
    @Query("apiKey") apiKey: string,
    @Query("comment") comment: string,
  ) {
    return this.metricsService.collectAllPagesMetrics(apiKey, comment);
  }
}