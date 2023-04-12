import { Body, Controller, Get, Param, Post, Put, Delete, Query, BadRequestException, Session } from "@nestjs/common";
import { CodeCoverageEntity } from "src/metrics/entities/code-coverage.entity";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { PaginationQuery } from "src/_common/models/pagination-query.model";
import { GetUserId } from "src/_common/utils/get-user-id";
import { CodeCoverageDetailsDto } from "./dto/code-coverage-details.dto";
import { CodeCoverageDto } from "./dto/code-coverage.dto";
import { CreatePageDto } from "./dto/create-page.dto";
import { FieldDataDto } from "./dto/field-data.dto";
import { GetPageFieldDataDto } from "./dto/get-page-field-data.dto";
import { GetPageLabDataDto } from "./dto/get-page-lab-data.dto";
import { LabDataDto } from "./dto/lab-data.dto";
import { PageDto } from "./dto/page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { PageEntity } from "./page.entity";
import { PagesService } from "./pages.sevice";

@Controller("pages")
export class PagesController {
  constructor(private pagesService: PagesService) { }

  @Get("")
  async getPages(
    @GetUserId() userId: number,
    @Query("dataType") dataType: MetricDataType,
    @Query() { limit = 4, offset = 0 }: PaginationQuery,
  ): Promise<PageDto[]> {
    const pages: PageEntity[] = await this.pagesService.getPages(
      userId, dataType, { limit, offset });
    return pages.map((e: PageEntity) => PageDto.fromEntity(e));
  }

  @Get("/count")
  getPagesCount(
    @GetUserId() userId: number,
    @Query("dataType") dataType: MetricDataType,
  ): Promise<number> {
    return this.pagesService.getPagesCount(userId, dataType);
  }

  @Post("")
  async createPage(
    @GetUserId() userId: number,
    @Body() dto: CreatePageDto
  ): Promise<PageDto> {
    const e: PageEntity = await this.pagesService.createPage(userId, dto);
    return PageDto.fromEntity(e);
  }

  @Get(":id")
  async getPage(@Param("id") id: number, @GetUserId() userId: number): Promise<PageDto> {
    const e: PageEntity = await this.pagesService.getPageById(id, userId);
    return PageDto.fromEntity(e);
  }

  @Put(":id")
  async updatePage(
    @Param("id") id: number,
    @Body() dto: UpdatePageDto,
    @GetUserId() userId: number
  ): Promise<PageDto> {
    const e: PageEntity = await this.pagesService.updatePage(id, dto, userId);
    return PageDto.fromEntity(e);
  }

  @Delete(":id")
  async deletePage(@Param("id") id: number, @GetUserId() userId: number): Promise<void> {
    await this.pagesService.deletePage(id, userId);
  }

  @Get("/lab-data/:id")
  async getPageLabData(
    @Param("id") pageId: number,
    @Query("deviceType") deviceType: DeviceType,
    @Query("from") from: string,
    @Query("to") to: string,
  ): Promise<LabDataDto[]> {
    if (!deviceType || !from || !to) {
      throw new BadRequestException("Invalid request query params");
    }

    const dto = GetPageLabDataDto.of(pageId, deviceType, from, to);
    const labDatas: LabDataEntity[] = await this.pagesService.getPageLabData(dto);
    return labDatas.map((data: LabDataEntity) => LabDataDto.fromEntity(data));
  }

  @Get("/field-data/:id")
  async getPageFieldData(
    @Param("id") pageId: number,
    @Query("deviceType") deviceType: DeviceType,
    @Query("from") from: string,
    @Query("to") to: string,
  ): Promise<FieldDataDto[]> {
    if (!deviceType || !from || !to) {
      throw new BadRequestException("Invalid request query params");
    }

    const dto = GetPageFieldDataDto.of(pageId, deviceType, from, to);
    const fieldDatas: FieldDataEntity[] = await this.pagesService.getPageFieldData(dto);
    return fieldDatas.map((data: FieldDataEntity) => FieldDataDto.fromEntity(data));
  }

  @Get("/lab-data-report/:id")
  getLabDataReport(
    @Param("id") pageId: number,
    @Query("deviceType") deviceType: DeviceType,
  ) {
    return this.pagesService.getLabDataReport(pageId, deviceType);
  }

  @Get("/code-coverage-details/:id")
  async getCodeCoverageDetails(
    @Param("id") pageId: number,
    @Query("deviceType") deviceType: DeviceType,
  ): Promise<CodeCoverageDetailsDto[]> {
    const entity = await this.pagesService.getCodeCoverageDetails(pageId, deviceType);
    return entity.details.map(detail => CodeCoverageDetailsDto.of(detail));
  }

  @Get("/code-coverage/:id")
  async getCodeCoverage(
    @Param("id") pageId: number,
    @Query("deviceType") deviceType: DeviceType,
    @Query("from") from: string,
    @Query("to") to: string,
  ) {
    if (!deviceType || !from || !to) {
      throw new BadRequestException("Invalid request query params");
    }

    const dto = GetPageFieldDataDto.of(pageId, deviceType, from, to);

    const coverages: CodeCoverageEntity[] =
      await this.pagesService.getCodeCoverages(dto);
    return coverages.map(c => CodeCoverageDto.of(c));
  }
}