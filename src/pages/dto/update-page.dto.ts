import { CreatePageDto } from "src/pages/dto/create-page.dto";

export type UpdatePageDto = Omit<CreatePageDto & { id: number }, "url">;
