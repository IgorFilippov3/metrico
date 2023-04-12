import { LabDataInput, LabDataInputData } from "./lab-data-input.model";

export class LabDataUi {
  name: string;
  series: LabDataUiItem[];

  static of({ name, dataset }: LabDataInput): LabDataUi {
    const uiData = new LabDataUi();
    uiData.name = name;
    uiData.series = dataset.map((d: LabDataInputData) => LabDataUiItem.of(d));
    return uiData;
  }
}

export class LabDataUiItem {
  value: number;
  name: Date;
  comment: string;

  static of({ value, collectedAt, comment }: LabDataInputData): LabDataUiItem {
    const item = new LabDataUiItem();
    item.value = value;
    item.name = new Date(collectedAt);
    item.comment = comment;
    return item; 
  }
}