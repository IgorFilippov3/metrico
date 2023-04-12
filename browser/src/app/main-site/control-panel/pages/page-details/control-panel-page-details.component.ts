import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { UpdateWay } from "@app/_core/models/update-way.enum";
import { UserModel } from "@app/_core/models/user.model";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { ControlPanelService } from "@app/main-site/control-panel/services/control-panel.service";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { combineLatest, Subject } from "rxjs";
import { PageDto } from "@app/_core/models/page.dto";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";
import { UpdatePageFormModel } from "./models/update-page-form.model";
import { UpdatePageDto } from "./models/update-page.dto";
import { TuiDialogService } from "@taiga-ui/core";
import { UserService } from "@app/_core/services/user.service";
import { environment } from "@env/environment";
import { HttpErrorResponse } from "@angular/common/http";
import { UserRole } from "@app/_core/models/user-role.enum";

@Component({
  selector: "mt-control-panel-page-details",
  templateUrl: "./control-panel-page-details.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelPageDetailsComponent implements OnInit, OnDestroy {
  UpdateWay = UpdateWay;
  UserRole = UserRole;

  form: FormGroup;
  updateWay: UpdateWay;
  user: UserModel;
  page: PageDto;
  updateWithHookEndpoint: string;
  backLabelActionText: string = "Data collect hook is triggered!";

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private controlPanelService: ControlPanelService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: TuiDialogService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.data,
      this.userService.getCurrentUser()
    ])
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(([data, user]: [Data, UserModel | null]) => {
        const { page } = data;

        if (page !== null) {
          this.user = user;
          this.page = page;
          this.updateWay = page.updateWay;
          this.updateWithHookEndpoint =
            environment.serverAddress
            + `/api/metrics/hook/one?apiKey=${user.apiKey}&pageId=${page.id}`;

          this.form = this.createForm(page);
          this.form.valueChanges
            .pipe(
              distinctUntilChanged<UpdatePageFormModel>((v1, v2) => v1.updateWay === v2.updateWay),
              takeUntil(this.isDestroyed$)
            )
            .subscribe(({ updateWay }: UpdatePageFormModel) => {
              this.updateWay = updateWay;
              this.changeDetector.markForCheck();
            });
          this.changeDetector.markForCheck();
        }
      });
  }

  updatePage(): void {
    if (this.form.invalid) {
      return this.notificationsService.error("All fields except name, are required");
    }

    const formData: UpdatePageFormModel = this.form.value;

    if (!this.isAtLeastOneServiceIsChecked(formData)) {
      return this.notificationsService.error("At least one service is required");
    }

    const updatePageDto: UpdatePageDto = UpdatePageDto.fromForm(formData);

    this.controlPanelService.updatePage(this.page.id, updatePageDto)
      .subscribe(() => {
        this.notificationsService.success("Your page was updated");
        this.router.navigate(["/panel/pages"]);
      });
  }

  openDeletePageDialog(template: any): void {
    this.dialogService
      .open(template)
      .subscribe();
  }

  deletePage(observer: any): void {
    this.controlPanelService.deletePage(this.page.id)
      .subscribe(() => {
        observer.complete();
        this.notificationsService.success("Your page was deleted");
        this.router.navigate(["/panel/pages"]);
      });
    ;
  }

  collectMetrics(): void {
    this.controlPanelService.collectPageMetrics(this.user.apiKey, this.page.id)
      .subscribe({
        next: () => {
          this.notificationsService.success("Page metrics will be collected soon");
        },
        error: ({ error }: HttpErrorResponse) => {
          console.error(error);
          this.notificationsService.error(error.message);
        }
      })
  }

  private createForm(page: PageDto): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(page.name),
      url: new FormControl({ value: page.url, disabled: true }),
      labData: new FormControl(this.isMetricActive(
        page.collectDataTypes, MetricDataType.LAB_DATA)),
      fieldData: new FormControl(this.isMetricActive(
        page.collectDataTypes, MetricDataType.FIELD_DATA)),
      codeCoverage: new FormControl(this.isMetricActive(
        page.collectDataTypes, MetricDataType.CODE_COVERAGE)),
      updateWay: new FormControl(page.updateWay),
    })
  }

  private isMetricActive(
    dataTypes: MetricDataType[],
    dataType: MetricDataType
  ): boolean {
    return dataTypes.includes(dataType);
  }

  private isAtLeastOneServiceIsChecked(
    { fieldData, labData, }: UpdatePageFormModel
  ): boolean {
    return [fieldData, labData].some((v: boolean) => v === true);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}