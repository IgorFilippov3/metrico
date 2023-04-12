import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { PagesApiService } from "@app/_core/services/pages-api.service";
import {
  DOM,
  ReportRenderer,
  ReportUIFeatures,
} from "lighthouse-viewer";

@Component({
  selector: "mt-lab-data-report",
  templateUrl: "./lab-data-report.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDataReportComponent implements OnChanges {
  @Input() pageID: number;
  @Input() deviceType: DeviceType;

  constructor(
    private pagesApiService: PagesApiService,
  ) {}

  ngOnChanges(): void {
    this.pagesApiService.getPageLabDataReport(this.pageID, this.deviceType)
      .subscribe(data => this.generateReport(data.result));
  }

  private generateReport(lighthouseReport: any) {
    const dom = new DOM(document);
    const renderer = new ReportRenderer(dom);
    const container = document.querySelector("main.lighthouse-viewer");
    renderer.renderReport(lighthouseReport, container);
    const features = new ReportUIFeatures(dom);
    features.initFeatures(lighthouseReport);

    const rootElement = document.querySelector(".lab-data-report__start");
    rootElement.classList.add("lab-data-report__end");
  }
}