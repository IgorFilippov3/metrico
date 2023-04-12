export enum MetricDataType {
  ALL = "ALL",
  LAB_DATA = "LAB_DATA",
  FIELD_DATA = "FIELD_DATA",
  CODE_COVERAGE = "CODE_COVERAGE",
}

export namespace MetricDataType {

  export function isValid(value: MetricDataType): boolean {
    return data.some(d => d.value === value);
  }

  interface MetricDataTypeData {
    value: MetricDataType;
  }

  const data: MetricDataTypeData[] = [
    { value: MetricDataType.ALL },
    { value: MetricDataType.LAB_DATA },
    { value: MetricDataType.FIELD_DATA },
    { value: MetricDataType.CODE_COVERAGE },
  ];
}