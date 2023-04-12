import { RuntimePerfCollectDataMode } from "./runtime-perf-collect-data-mode.enum";

export interface GetPageRuntimePerfDataDto {
  pageId: number;
  collectDataMode: RuntimePerfCollectDataMode;
  from: string; //ISOString
  to: string; // ISOString
}