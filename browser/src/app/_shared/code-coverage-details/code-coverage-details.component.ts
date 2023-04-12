import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from "@angular/core";
import { CodeCoverageDetails } from "@app/_core/models/code-coverage-details.model";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { CodeCoverageApiService } from "@app/_core/services/code-coverage-api.service";

@Component({
  selector: "mt-code-coverage-details",
  templateUrl: "./code-coverage-details.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCoverageDetailsComponent implements OnChanges {
  @Input() pageID: number;
  @Input() deviceType: DeviceType;

  details: CodeCoverageDetails[];
  selectedDetails: CodeCoverageDetails;

  private SIZE_BLOCK_WIDTH: number = 300;

  constructor(
    private codeCoverageApiService: CodeCoverageApiService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    this.codeCoverageApiService
      .getCodeCoveragesDetails(this.pageID, this.deviceType)
      .subscribe((details: CodeCoverageDetails[]) => {

        details.sort((a, b) => b.bytes - a.bytes);

        this.details = details.map(d => ({
          unusedBytes: d.unusedBytes,
          bytes: d.bytes,
          name: d.name,
          unusedBytesBlockWidth: this.calcUnusedBlockWidth(d.bytes, d.unusedBytes),
        }));
        
        this.changeDetector.markForCheck();
      });
  }

  selectName(details: CodeCoverageDetails): void {
    this.selectedDetails = details;
    this.changeDetector.markForCheck();
  }

  private calcUnusedBlockWidth(bytes: number, unusedBytes: number): string {
    const percent: number = unusedBytes / bytes * 100;
    if (percent < 15) return "auto";
    return (this.SIZE_BLOCK_WIDTH * percent / 100) + "px";
  }
}