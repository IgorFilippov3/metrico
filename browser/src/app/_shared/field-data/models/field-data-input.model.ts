export class FieldDataInputModel {
  cumulativeLayoutShift: FieldDataInputMetric[];
  firstContentfulPaint: FieldDataInputMetric[];
  firstInputDelay: FieldDataInputMetric[];
  largestContentfulPaint: FieldDataInputMetric[];

  static snap(): FieldDataInputModel {
    const input = new FieldDataInputModel();
    input.cumulativeLayoutShift = [
      FieldDataInputMetric.snap("good"),
      FieldDataInputMetric.snap("average"),
      FieldDataInputMetric.snap("bad"),
    ];
    input.firstContentfulPaint = [
      FieldDataInputMetric.snap("good"),
      FieldDataInputMetric.snap("average"),
      FieldDataInputMetric.snap("bad"),
    ];
    input.firstInputDelay = [
      FieldDataInputMetric.snap("good"),
      FieldDataInputMetric.snap("average"),
      FieldDataInputMetric.snap("bad"),
    ];
    input.largestContentfulPaint = [
      FieldDataInputMetric.snap("good"),
      FieldDataInputMetric.snap("average"),
      FieldDataInputMetric.snap("bad"),
    ];
    return input;
  }
}

export class FieldDataInputMetric {
  name: "good" | "average" | "bad";
  series: FieldDataInputMetricSeries[];

  static snap(name: "good" | "average" | "bad"): FieldDataInputMetric {
    const input = new FieldDataInputMetric();
    input.name = name;
    input.series = [];
    return input;
  }
}

export interface FieldDataInputMetricSeries {
  name: Date;
  value: number;
  comment?: string;
}