export interface CollectDataTypesModelOpts {
  psi: boolean;
  runtimePerf: boolean;
  disabledJs: boolean;
}

export class CollectDataTypesModel {
  psi?: boolean;
  runtimePerf?: boolean;
  disabledJs?: boolean;

  static fromForm({
    psi, runtimePerf, disabledJs
  }: CollectDataTypesModelOpts): CollectDataTypesModel {
    console.dir({ psi, runtimePerf, disabledJs });
    const model = new CollectDataTypesModel();
    if (psi) model.psi = psi;
    if (runtimePerf) model.runtimePerf = runtimePerf;
    if (disabledJs) model.disabledJs = disabledJs;
    return model;
  }
}