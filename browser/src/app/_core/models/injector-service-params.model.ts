export interface InjectorServiceParams {
  src: string;
  globalVarName: string; 
  globalVarNameMethods?: string[];
  async?: boolean;
  defer?: boolean;
  requestTimeout?: number;
}