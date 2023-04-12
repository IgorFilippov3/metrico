import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { LabDataInput, LabDataInputData } from "@app/_shared/lab-data/models/lab-data-input.model";
import { Subject } from "rxjs";
import { TabItem } from "@app/_core/models/tab-item.model";
import { TuiDay, TuiDayRange, TUI_IS_ANDROID, TUI_IS_IOS } from "@taiga-ui/cdk";
import { TUI_MOBILE_AWARE } from "@taiga-ui/kit";
import { ActivatedRoute, Data } from "@angular/router";
import { map, takeUntil } from "rxjs/operators";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { LighthouseService } from "@app/main-site/lighthouse/services/lighthouse.service";
import { LabDataDto } from "@app/_core/models/lab-data.dto";
import { LabDataMetrics } from "@app/_core/models/lab-data-metrics.model";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { PageDto } from "@app/_core/models/page.dto";
import { currentYear } from "@app/_core/utils";

@Component({
  selector: "mt-lighthouse-metrics",
  templateUrl: "./lighthouse-metrics.component.html",
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
export class LighthouseMetricsComponent implements OnInit, OnDestroy {
  DeviceType = DeviceType;
  page: PageDto;
  currentDeviceType: DeviceType = DeviceType.DESKTOP;
  DATE_RANGE_MIN: TuiDay = new TuiDay(2021, 0, 1);
  DATE_RANGE_MAX: TuiDay = new TuiDay(currentYear(), 11, 31);
  selectedDateRangeMin: TuiDay = this.DATE_RANGE_MIN;
  selectedDateRangeMax: TuiDay = this.DATE_RANGE_MAX;
  tabItems: TabItem[];
  displayData: LabDataInput[];
  dateRangeForm: FormGroup;
  isNotEnoughMetricAvailable: boolean;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private lighthouseService: LighthouseService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dateRangeForm = this.createDateRangeForm();

    this.lighthouseService.labData$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((data: LabDataDto[]) => {
        this.displayData = data === null
          ? null
          : this.createDisplayData(data);
      
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
        this.getLabData();
      });

    this.dateRangeForm.valueChanges
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(values => {
        const dateRange: { from: TuiDay, to: TuiDay } = values.dateRange;
        this.selectedDateRangeMin = dateRange.from;
        this.selectedDateRangeMax = dateRange.to;
        this.getLabData();
      });
  }

  changeCurrentDeviceType(type: DeviceType): void {
    this.currentDeviceType = type;
    this.getLabData();
    this.changeDetector.markForCheck();
  }

  private getLabData(): void {
    this.lighthouseService.getPageLabData({
      pageId: this.page.id,
      deviceType: this.currentDeviceType,
      from: this.selectedDateRangeMin.toUtcNativeDate().toISOString(),
      to: this.selectedDateRangeMax.toUtcNativeDate().toISOString(),
    });
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

  private createDisplayData(data: LabDataDto[]): LabDataInput[] {
    const input: LabDataInput[] = [
      this.createLabDataInput("First Contentful Paint", "firstContentfulPaint", data),
      this.createLabDataInput("Cumulative Layout Shift", "cumulativeLayoutShift", data),
      this.createLabDataInput("Speed Index", "speedIndex", data),
      this.createLabDataInput("Time To Interactive", "timeToInteractive", data),
      this.createLabDataInput("Total Blocking Time", "totalBlockingTime", data),
      this.createLabDataInput("Network RTT", "networkRtt", data),
      this.createLabDataInput("Total Byte Weight", "totalByteWeight", data),
      this.createLabDataInput("Time to First Byte", "timeToFirstByte", data),
      this.createLabDataInput("First Meaningful Paint", "firstMeaningfulPaint", data),
    ];

    if (this.currentDeviceType === DeviceType.MOBILE) {
      input.unshift(
        this.createLabDataInput("First Contentful Paint 3g", "firstContentfulPaint3g", data)
      );
    }

    return input;
  }

  private createLabDataInput(
    name: string,
    metricName: LabDataMetrics,
    data: LabDataDto[]
  ): LabDataInput {
    return {
      name: name,
      dataset: this.createDataset(data, metricName),
    }
  }

  private createDataset(data: LabDataDto[], metricName: LabDataMetrics): LabDataInputData[] {
    const input: LabDataInputData[] = [];

    for (let d of data) {
      if (d[metricName] === null) continue;

      if (metricName === "totalByteWeight") {
        const toKB: number = d[metricName] / 1000;
        const rounded: number = Math.round(toKB);
        input.push(LabDataInputData.of(rounded, d.collectedAt, d.comment));
      } else {
        const toSeconds: number = d[metricName] / 1000;
        const rounded: number = parseFloat(toSeconds.toFixed(1));
        input.push(LabDataInputData.of(rounded, d.collectedAt, d.comment));
      }
    }

    return input;
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}