import { RuntimePerfUI } from "@app/main-site/runtime-perf/models/runtime-perf.ui";
import { RuntimePerfMetricsModel } from "@app/_core/models/runtime-perf-metrics.model";

export interface RuntimePerfInputModelOpts {
  name: string;
  metricName: RuntimePerfMetricsModel;
  uiData: RuntimePerfUI[];
  description: string;
  duration?: boolean;
}

export class RuntimePerfInputModel {
  name: string;
  series: RuntimePerfInputData[];
  duration: boolean;
  description: string;

  static of({
    name,
    metricName,
    uiData,
    description,
    duration
  }: RuntimePerfInputModelOpts): RuntimePerfInputModel {
    const inputModel = new RuntimePerfInputModel();
    inputModel.name = name;
    inputModel.series = uiData.map(d => RuntimePerfInputData.of(d[metricName], d.timestamp));
    inputModel.duration = !!duration;
    inputModel.description = description;
    return inputModel;
  }
}

export class RuntimePerfInputData {
  value: number;
  name: Date;

  static of(value: number, collectedAt: string): RuntimePerfInputData {
    const item = new RuntimePerfInputData();
    item.value = value;
    item.name = new Date(collectedAt);
    return item;
  }
}