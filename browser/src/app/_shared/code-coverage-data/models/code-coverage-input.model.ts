export interface CodeCoverageInput {
  name: string;
  dataset: CodeCoverageInputData[];
}

export class CodeCoverageInputData {
  value: number;
  collectedAt: string;
  comment: string;

  static of(value: number, collectedAt: string, comment: string): CodeCoverageInputData {
    const d = new CodeCoverageInputData();
    d.value = value;
    d.collectedAt = collectedAt;
    d.comment = comment;
    return d;
  }
}