import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Data } from "@angular/router";
import { CodeCoverageMetrics } from "@app/_core/models/code-coverage-metrics.model";
import { CodeCoverageDto } from "@app/_core/models/code-coverage.dto";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { PageDto } from "@app/_core/models/page.dto";
import { TabItem } from "@app/_core/models/tab-item.model";
import { currentYear } from "@app/_core/utils";
import { CodeCoverageInput, CodeCoverageInputData } from "@app/_shared/code-coverage-data/models/code-coverage-input.model";
import { TuiDay, TuiDayRange, TUI_IS_ANDROID, TUI_IS_IOS } from "@taiga-ui/cdk";
import { TUI_MOBILE_AWARE } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { CodeCoverageService } from "../../services/code-coverage.serivce";

@Component({
  selector: "mt-code-coverage-metrics",
  templateUrl: "./code-coverage-metrics.component.html",
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
export class CodeCoverageMetricsComponent implements OnInit, OnDestroy {
  DeviceType = DeviceType;
  page: PageDto;
  currentDeviceType: DeviceType = DeviceType.DESKTOP;
  DATE_RANGE_MIN: TuiDay = new TuiDay(currentYear(), 0, 1);
  DATE_RANGE_MAX: TuiDay = new TuiDay(currentYear(), 11, 31);
  selectedDateRangeMin: TuiDay = this.DATE_RANGE_MIN;
  selectedDateRangeMax: TuiDay = this.DATE_RANGE_MAX;
  tabItems: TabItem[];
  displayData: any;
  dateRangeForm: FormGroup;
  isNotEnoughMetricAvailable: boolean;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private codeCoverageService: CodeCoverageService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.dateRangeForm = this.createDateRangeForm();

    this.dateRangeForm.valueChanges
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(values => {
        const dateRange: { from: TuiDay, to: TuiDay } = values.dateRange;
        this.selectedDateRangeMin = dateRange.from;
        this.selectedDateRangeMax = dateRange.to;
        this.getPageData();
      });

    this.codeCoverageService.data$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((data: CodeCoverageDto[]) => {
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
        this.getPageData();
      });
  }

  changeCurrentDeviceType(type: DeviceType): void {
    this.currentDeviceType = type;
    this.getPageData();
    this.changeDetector.markForCheck();
  }

  private getPageData(): void {
    this.codeCoverageService.getPageData({
      pageId: this.page.id,
      deviceType: this.currentDeviceType,
      from: this.selectedDateRangeMin.toUtcNativeDate().toISOString(),
      to: this.selectedDateRangeMax.toUtcNativeDate().toISOString(),
    });
  }

  private createDisplayData(data: CodeCoverageDto[]): CodeCoverageInput[] {
    const input: CodeCoverageInput[] = [
      this.createCodeCoverageInput("Total bytes", "bytes", data),
      this.createCodeCoverageInput("Total unused bytes", "unusedBytes", data),
    ];

    return input;
  }

  private createCodeCoverageInput(
    name: string,
    metricName: CodeCoverageMetrics,
    data: CodeCoverageDto[]
  ): CodeCoverageInput {
    return {
      name: name,
      dataset: this.createDataset(data, metricName),
    }
  }

  private createDataset(
    data: CodeCoverageDto[], 
    metricName: CodeCoverageMetrics
  ): CodeCoverageInputData[] {
    const dataset: CodeCoverageInputData[] = [];
    
    for (let d of data) {
      if (d[metricName] === null) continue;

      dataset.push(CodeCoverageInputData.of(d[metricName], d.collectedAt, d.comment));
    }

    return dataset;
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

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}