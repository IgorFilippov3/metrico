export enum MetricDataType {
  ALL = "ALL",
  LAB_DATA = "LAB_DATA",
  FIELD_DATA = "FIELD_DATA",
  CODE_COVERAGE = "CODE_COVERAGE",
}

export namespace MetricDataType {

  export function getDisplayName(value: MetricDataType): string {
    const item: MetricDataTypeData = data.find(d => d.value === value);
    return item ? item.displayName : "";
  }

  export function isValid(value: MetricDataType): boolean {
    return data.some(d => d.value === value);
  }

  interface MetricDataTypeData {
    value: MetricDataType;
    displayName: string;
  }

  const data: MetricDataTypeData[] = [
    { value: MetricDataType.LAB_DATA, displayName: "Lighthouse" },
    { value: MetricDataType.FIELD_DATA, displayName: "User Experience" },
    { value: MetricDataType.CODE_COVERAGE, displayName: "Code Coverage" },
  ];
}