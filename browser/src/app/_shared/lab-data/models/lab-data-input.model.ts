export interface LabDataInput {
  name: string;
  dataset: LabDataInputData[];
}

export class LabDataInputData {
  value: number;
  collectedAt: string;
  comment: string;

  static of(value: number, collectedAt: string, comment: string): LabDataInputData {
    const d = new LabDataInputData();
    d.value = value;
    d.collectedAt = collectedAt;
    d.comment = comment;
    return d;
  }
}