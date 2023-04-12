import { NetworkStatus } from "./network-status.enum";

export class NetworkData<T> {
  data: T;
  status: NetworkStatus;

  static initial<T>(data: T): NetworkData<T> {
    const nd = new NetworkData<T>();
    nd.data = data;
    nd.status = NetworkStatus.NOT_ASKED;
    return nd;
  }

  static success<T>(data: T): NetworkData<T> {
    const nd = new NetworkData<T>();
    nd.data = data;
    nd.status = NetworkStatus.ASKED;
    return nd;
  }

  static error(e: any): NetworkData<any> {
    const nd = new NetworkData<any>();
    nd.data = e;
    nd.status = NetworkStatus.ERROR;
    return nd;
  }
}