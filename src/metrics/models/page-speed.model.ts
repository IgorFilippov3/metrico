import { CodeCoverageDetails } from "src/_common/models/code-coverage-details.model";
import { getNameFromUrl } from "src/_common/utils";

export class PageSpeedModel {
  url: string;
  fieldData: PageSpeedFieldDataModel;
  labData: PageSpeedLabDataModel;

  static of({ loadingExperience, lighthouseResult, id }: PageSpeedModelRaw): PageSpeedModel {
    if (!loadingExperience.metrics || !lighthouseResult.audits) {
      return null;
    }

    const m = new PageSpeedModel();
    m.url = id;
    m.fieldData = PageSpeedFieldDataModel.of(loadingExperience.metrics);
    m.labData = PageSpeedLabDataModel.of(lighthouseResult.audits);
    return m;
  }
}

export class PageSpeedFieldDataModel {
  cumulativeLayoutShift: PageSpeedFieldDataMetricModel | null;
  firstContentfulPaint: PageSpeedFieldDataMetricModel | null;
  firstInputDelay: PageSpeedFieldDataMetricModel | null;
  largestContentfulPaint: PageSpeedFieldDataMetricModel | null;

  static of({
    CUMULATIVE_LAYOUT_SHIFT_SCORE,
    FIRST_CONTENTFUL_PAINT_MS,
    FIRST_INPUT_DELAY_MS,
    LARGEST_CONTENTFUL_PAINT_MS
  }: PageSpeedLoadingExperienceMetricsRaw): PageSpeedFieldDataModel {
    const m = new PageSpeedFieldDataModel();
    m.cumulativeLayoutShift = CUMULATIVE_LAYOUT_SHIFT_SCORE ?
      PageSpeedFieldDataMetricModel.of(CUMULATIVE_LAYOUT_SHIFT_SCORE)
      : null;
    m.firstContentfulPaint = FIRST_CONTENTFUL_PAINT_MS ?
      PageSpeedFieldDataMetricModel.of(FIRST_CONTENTFUL_PAINT_MS)
      : null;
    m.firstInputDelay = FIRST_INPUT_DELAY_MS
      ? PageSpeedFieldDataMetricModel.of(FIRST_INPUT_DELAY_MS)
      : null;
    m.largestContentfulPaint = LARGEST_CONTENTFUL_PAINT_MS
      ? PageSpeedFieldDataMetricModel.of(LARGEST_CONTENTFUL_PAINT_MS)
      : null;
    return m;
  }
}

export class PageSpeedFieldDataMetricModel {
  value: number;
  good: number;
  average: number;
  bad: number;

  static of({ percentile, distributions }: PageSpeedLoadingExperienceMetricRaw): PageSpeedFieldDataMetricModel {
    const m = new PageSpeedFieldDataMetricModel();
    m.value = percentile;
    const [good, average, bad] = distributions;
    m.good = parseFloat(good.proportion.toFixed(2)) * 100;
    m.average = parseFloat(average.proportion.toFixed(2)) * 100;
    m.bad = parseFloat(bad.proportion.toFixed(2)) * 100;
    return m;
  }
}

export class PageSpeedLabDataModel {
  cumulativeLayoutShift: number;
  firstContentfulPaint: number;
  firstContentfulPaint3g: number;
  speedIndex: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  networkRtt: number;
  totalByteWeight: number;
  timeToFirstByte: number;
  firstMeaningfulPaint: number;
  bytes: number;
  unusedBytes: number;
  details: CodeCoverageDetails[];

  static of(audits: PageSpeedLighthouseResultAuditsRaw): PageSpeedLabDataModel {
    const m = new PageSpeedLabDataModel();
    m.cumulativeLayoutShift = parseFloat(audits["cumulative-layout-shift"].numericValue.toFixed(2));
    m.firstContentfulPaint = Math.round(audits["first-contentful-paint"].numericValue);
    m.firstContentfulPaint3g = audits["first-contentful-paint-3g"]
      ? Math.round(audits["first-contentful-paint-3g"].numericValue)
      : null;
    m.speedIndex = Math.round(audits["speed-index"].numericValue);
    m.timeToInteractive = Math.round(audits["interactive"].numericValue);
    m.totalBlockingTime = Math.round(audits["total-blocking-time"].numericValue);
    m.networkRtt = Math.round(audits["network-rtt"].numericValue);
    m.totalByteWeight = Math.round(audits["total-byte-weight"].numericValue);
    m.timeToFirstByte = Math.round(audits["server-response-time"].numericValue);
    m.firstMeaningfulPaint = Math.round(audits["first-meaningful-paint"].numericValue);

    m.bytes = this.getTotalBytes(audits["script-treemap-data"].details.nodes);
    m.unusedBytes = this.getTotalUnusedBytes(audits["script-treemap-data"].details.nodes);
    m.details = this.buildCodeCoverageDetails(audits["script-treemap-data"].details.nodes);
    return m;
  }

  static buildCodeCoverageDetails(nodes: ScriptTreemapNode[]): CodeCoverageDetails[] {
    const result = [];
    
    for (let node of nodes) {
      if (node.unusedBytes) {
        result.push({
          unusedBytes: node.unusedBytes,
          bytes: node.resourceBytes,
          name: getNameFromUrl(node.name),
        });
      }
    }
    return result;
  }

  static getTotalBytes(nodes: ScriptTreemapNode[]): number {
    return nodes.reduce((acc, cur) => acc + cur.resourceBytes, 0);
  }

  static getTotalUnusedBytes(nodes: ScriptTreemapNode[]): number {
    return nodes.reduce((acc, cur) => {
      return cur.unusedBytes ? acc + cur.unusedBytes : acc;
    }, 0);
  }
}

// --------------------- RAW ---------------------

export interface PageSpeedModelRaw {
  id: string;
  loadingExperience: {
    id: string;
    metrics: PageSpeedLoadingExperienceMetricsRaw;
  };
  lighthouseResult: {
    audits: PageSpeedLighthouseResultAuditsRaw;
  };
}



export interface PageSpeedLoadingExperienceMetricsRaw {
  CUMULATIVE_LAYOUT_SHIFT_SCORE: PageSpeedLoadingExperienceMetricRaw;
  FIRST_CONTENTFUL_PAINT_MS: PageSpeedLoadingExperienceMetricRaw;
  FIRST_INPUT_DELAY_MS: PageSpeedLoadingExperienceMetricRaw;
  LARGEST_CONTENTFUL_PAINT_MS: PageSpeedLoadingExperienceMetricRaw;
}

interface PageSpeedLoadingExperienceMetricRaw {
  percentile: number;
  distributions: { min: number, max: number, proportion: number }[];
  category: "FAST" | "AVERAGE";
}

interface PageSpeedLighthouseResultAuditsRaw {
  "cumulative-layout-shift": { numericValue: number }
  "first-contentful-paint": { numericValue: number }
  "speed-index": { numericValue: number }
  "interactive": { numericValue: number }
  "total-blocking-time": { numericValue: number }
  "network-rtt": { numericValue: number }
  "total-byte-weight": { numericValue: number }
  "first-contentful-paint-3g": { numericValue: number }
  "timeToFirstByte": { numericValue: number }
  "first-meaningful-paint": { numericValue: number },
  "script-treemap-data": {
    details: {
      nodes: ScriptTreemapNode[];
    }
  }
}

interface ScriptTreemapNode {
  name: string;
  resourceBytes: number;
  unusedBytes?: number;
}