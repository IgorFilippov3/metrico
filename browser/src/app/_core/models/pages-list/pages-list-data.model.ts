import { PageDto } from "@app/_core/models/page.dto";
import { PagesListViewRequest } from "./pages-list-view-request.model";

export class PagesListData {
  viewRequest: PagesListViewRequest;
  pages: PageDto[];
  pagesCount: number;
}