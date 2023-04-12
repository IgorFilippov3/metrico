import { CollectDataTypesModel } from "src/pages/models/collect-data-types.model";
import { UpdateWay } from "src/pages/models/update-way.enum";
import { PageEntity } from "src/pages/page.entity";

export class PageDto {
  id: number;
  url: string;
  collectDataTypes: CollectDataTypesModel;
  updateWay: UpdateWay;
  name: string;

  static fromEntity({ id, url, collectDataTypes, name, updateWay }: PageEntity): PageDto {
    const dto = new PageDto();
    dto.id = id;
    dto.url = url;
    dto.collectDataTypes = collectDataTypes;
    dto.name = name;
    dto.updateWay = updateWay;
    return dto;
  }
}