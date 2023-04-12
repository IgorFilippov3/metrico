export enum InjectionStatus {
  ERROR = "ERROR",
  UNKNOWN = "UNKNOWN",
  LOADED = "LOADED",
  NOT_LOADED = "NOT_LOADED",
  ALREADY_LOADED = "ALREADY_LOADED",
  ALREADY_ADDED = "ALREADY_ADDED",
  REQUEST_TIMED_OUT = "REQUEST_TIMED_OUT"
}

export namespace InjectionStatus {

  export function isSuccessStatus(status: InjectionStatus): boolean {
    return status === InjectionStatus.LOADED ||
      status === InjectionStatus.ALREADY_LOADED ||
      status === InjectionStatus.ALREADY_ADDED;
  }
}