export enum UpdateWay {
  PER_DAY = "PER_DAY",
  HOOK = "HOOK"
}

export namespace UpdateWay {

  export function getDisplayName(value: UpdateWay): string {
    const d: UpdateWayData = data.find(item => item.value === value);
    return d ? d.displayName : "";
  }

  interface UpdateWayData {
    value: UpdateWay;
    displayName: string;
  }

  const data: UpdateWayData[] = [
    { value: UpdateWay.PER_DAY, displayName: "Daily" },
    { value: UpdateWay.HOOK, displayName: "Webhook" },
  ];
}