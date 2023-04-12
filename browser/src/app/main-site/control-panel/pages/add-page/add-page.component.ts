import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";
import { PageDto } from "@app/_core/models/page.dto";
import { Subscription } from "@app/_core/models/subscription.enum";
import { UpdateWay } from "@app/_core/models/update-way.enum";
import { UserRole } from "@app/_core/models/user-role.enum";
import { UserModel } from "@app/_core/models/user.model";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { UserService } from "@app/_core/services/user.service";
import { isValidURL } from "@app/_core/utils";
import { combineLatest, Subject } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { AddPageService } from "./add-page.service";
import { CreatePageFormModel } from "./models/create-page-form.model";
import { CreatePageDto } from "./models/create-page.dto";

@Component({
  selector: "mt-add-page",
  templateUrl: "./add-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPageComponent implements OnInit, OnDestroy {
  UpdateWay = UpdateWay;
  UserRole = UserRole;

  form: FormGroup;
  updateWay: UpdateWay;
  user: UserModel;
  userPages: PageDto[];
  userPagesLimit: number;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private addPageService: AddPageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.userService.getCurrentUser(),
      this.addPageService.loadPages()
    ])
    .pipe(takeUntil(this.isDestroyed$))
    .subscribe(([user, userPages]: [UserModel, PageDto[]]) => {
      this.user = user;
      this.userPages = userPages;
      this.userPagesLimit = Subscription.pagesLimit(user.subscription);
      this.changeDetector.markForCheck();
    });

    this.route.queryParams
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((params: Params) => {
        this.form = this.createForm(params["data"]);
        this.form.valueChanges
          .pipe(
            distinctUntilChanged<CreatePageFormModel>((v1, v2) => v1.updateWay === v2.updateWay),
            takeUntil(this.isDestroyed$)
          )
          .subscribe(({ updateWay }: CreatePageFormModel) => {
            this.updateWay = updateWay;
            this.changeDetector.markForCheck();
          });
      });
  }

  savePage(): void {
    if (this.form.invalid) {
      return this.notificationsService.error(
        "All fields except NAME, are required");
    }

    if (!isValidURL(this.form.value.url)) {
      return this.notificationsService.error("Invalid PAGE URL value");
    }

    if (this.isPageAlreadyExists(this.form.value.url)) {
      return this.notificationsService.error("You already have page with this URL");
    }

    const formData: CreatePageFormModel = this.form.value;

    if (!this.isAtLeastOneServiceIsChecked(formData)) {
      return this.notificationsService.error("At least one service is required");
    }

    if (this.userPages.length >= this.userPagesLimit) {
      return this.notificationsService.error(
        `The number of pages in your subscription is limited to ${this.userPagesLimit}.`
      );
    }

    const createPageDto: CreatePageDto = CreatePageDto.fromForm(formData);

    this.addPageService.createPage(createPageDto)
      .subscribe({
        next: (page: PageDto) => {
          this.notificationsService.success(
            `Page ${page.url} was added in your list`
          );
          this.router.navigate(["/panel/pages"]);
        }
      });
  }

  private createForm(dataTypeFromParams: MetricDataType): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(""),
      url: new FormControl("", Validators.required),
      labData: new FormControl(dataTypeFromParams === MetricDataType.LAB_DATA),
      fieldData: new FormControl(dataTypeFromParams === MetricDataType.FIELD_DATA),
      codeCoverage: new FormControl(dataTypeFromParams == MetricDataType.CODE_COVERAGE),
      updateWay: new FormControl(UpdateWay.HOOK),
    });
  }

  private isAtLeastOneServiceIsChecked(
    { fieldData, labData, codeCoverage }: CreatePageFormModel
  ): boolean {
    return [fieldData, labData, codeCoverage].some((v: boolean) => v === true);
  }

  private isPageAlreadyExists(pageUrl: string): boolean {
    return this.userPages.some((page: PageDto) => page.url === pageUrl);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}