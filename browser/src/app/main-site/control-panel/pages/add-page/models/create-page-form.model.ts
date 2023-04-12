import { UpdateWay } from "@app/_core/models/update-way.enum";

export interface CreatePageFormModel {
  name: string;
  url: string;
  fieldData: boolean;
  labData: boolean;
  codeCoverage: boolean;
  updateWay: UpdateWay;
}