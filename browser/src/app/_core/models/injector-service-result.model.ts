import { InjectionStatus } from "./injection-status.enum";

export class InjectorServiceResult<T> {
  status: InjectionStatus;
  result: T;

  static success<T>(status: InjectionStatus, result: T): InjectorServiceResult<T> {
    return { status, result };
  }

  static error(status: InjectionStatus, result: string): InjectorServiceResult<string> {
    return { status, result };
  }
}