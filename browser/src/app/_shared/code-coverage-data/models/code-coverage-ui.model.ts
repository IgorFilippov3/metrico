import { CodeCoverageInput, CodeCoverageInputData } from "./code-coverage-input.model";

export class CodeCoverageUi {
  name: string;
  series: CodeCoverageUiItem[];

  static of({ name, dataset }: CodeCoverageInput): CodeCoverageUi {
    const uiData = new CodeCoverageUi();
    uiData.name = name;
    uiData.series = dataset.map((d: CodeCoverageInputData) => CodeCoverageUiItem.of(d));
    return uiData;
  }
}

export class CodeCoverageUiItem {
  value: number;
  name: Date;
  comment: string;

  static of({ value, collectedAt, comment }: CodeCoverageInputData): CodeCoverageUiItem {
    const item = new CodeCoverageUiItem();
    item.value = value;
    item.name = new Date(collectedAt);
    item.comment = comment;
    return item; 
  }
}