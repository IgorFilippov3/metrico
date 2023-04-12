import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { PageSpeedService } from "@app/main-site/page-speed/services/page-speed.service";
import { map, takeUntil } from "rxjs/operators";
import { FieldDataDto, FieldDataItemDto } from "@app/_core/models/field-data.to";
import { ActivatedRoute, Data } from "@angular/router";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { FieldDataInputMetric, FieldDataInputModel } from "@app/_shared/field-data/models/field-data-input.model";
import { TUI_MOBILE_AWARE } from "@taiga-ui/kit";
import { TuiDay, TuiDayRange, TUI_IS_ANDROID, TUI_IS_IOS } from "@taiga-ui/cdk";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PageDto } from "@app/_core/models/page.dto";
import { currentYear } from "@app/_core/utils";

@Component({
  selector: "mt-page-speed-metrics",
  templateUrl: "./page-speed-metrics.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_MOBILE_AWARE,
      useValue: true,
    },
    {
      provide: TUI_IS_IOS,
      useValue: false,
    },
    {
      provide: TUI_IS_ANDROID,
      useValue: true,
    },
  ]
})
export class PageSpeedMetricsComponent implements OnInit, OnDestroy {
  DeviceType = DeviceType;
  page: PageDto;
  currentDeviceType: DeviceType = DeviceType.DESKTOP;
  DATE_RANGE_MIN: TuiDay = new TuiDay(2021, 0, 1);
  DATE_RANGE_MAX: TuiDay = new TuiDay(currentYear(), 11, 31);
  selectedDateRangeMin: TuiDay = this.DATE_RANGE_MIN;
  selectedDateRangeMax: TuiDay = this.DATE_RANGE_MAX;
  displayData: FieldDataInputModel;
  dateRangeForm: FormGroup;
  isNotEnoughMetricAvailable: boolean;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private pageSpeedService: PageSpeedService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dateRangeForm = this.createDateRangeForm();

    this.pageSpeedService.fieldData$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((data: FieldDataDto[]) => {
        this.displayData = data === null
          ? null
          : this.createFieldDataInput(data);
        this.isNotEnoughMetricAvailable = data?.length <= 1;
        this.changeDetector.markForCheck();
      });

    this.route.data
      .pipe(
        map((data: Data) => data.page),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((page: PageDto) => {
        this.page = page;
        this.getFieldData();
      });

    this.dateRangeForm.valueChanges
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(values => {
        const dateRange: { from: TuiDay, to: TuiDay } = values.dateRange;
        this.selectedDateRangeMin = dateRange.from;
        this.selectedDateRangeMax = dateRange.to;
        this.getFieldData();
      });
  }

  changeCurrentDeviceType(type: DeviceType): void {
    this.currentDeviceType = type;
    this.getFieldData();
    this.changeDetector.markForCheck();
  }

  private createDateRangeForm(): FormGroup {
    return this.formBuilder.group({
      dateRange: new FormControl(
        new TuiDayRange(
          this.selectedDateRangeMin,
          this.selectedDateRangeMax
        )
      ),
    })
  }

  private getFieldData(): void {
    this.pageSpeedService.getFieldData({
      pageId: this.page.id,
      deviceType: this.currentDeviceType,
      from: this.selectedDateRangeMin.toUtcNativeDate().toISOString(),
      to: this.selectedDateRangeMax.toUtcNativeDate().toISOString(),
    });
  }

  private createFieldDataInput(fieldDataDto: FieldDataDto[]): FieldDataInputModel {
    const input: FieldDataInputModel = FieldDataInputModel.snap();

    for (let f of fieldDataDto) {
      if (f.cumulativeLayoutShift) {
        input.cumulativeLayoutShift = this.handleData(
          input.cumulativeLayoutShift,
          f.cumulativeLayoutShift,
          f.collectedAt,
          f.comment,
        );
      }

      if (f.firstContentfulPaint) {
        input.firstContentfulPaint = this.handleData(
          input.firstContentfulPaint,
          f.firstContentfulPaint,
          f.collectedAt,
          f.comment,
        );
      }

      if (f.firstInputDelay) {
        input.firstInputDelay = this.handleData(
          input.firstInputDelay,
          f.firstInputDelay,
          f.collectedAt,
          f.comment,
        );
      }

      if (f.largestContentfulPaint) {
        input.largestContentfulPaint = this.handleData(
          input.largestContentfulPaint,
          f.largestContentfulPaint,
          f.collectedAt,
          f.comment,
        );
      }
    }

    return input;
  }

  private handleData(
    metric: FieldDataInputMetric[],
    value: FieldDataItemDto,
    collectedAt: string,
    comment: string,
  ): FieldDataInputMetric[] {
    const [goodMetrics, averageMetrics, badMetrics] = metric;
    const { good, average, bad } = value;
    goodMetrics.series.push({ value: good, name: new Date(collectedAt), comment });
    averageMetrics.series.push({ value: average, name: new Date(collectedAt), comment });
    badMetrics.series.push({ value: bad, name: new Date(collectedAt), comment });
    return metric;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}