export interface GetMetricsServiceModel<T> {
  getMetrics(urls: string[], options?: any, config?: any): Promise<T[]>;
}