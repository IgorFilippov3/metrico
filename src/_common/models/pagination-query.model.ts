export class PaginationQuery {
  limit: number;
  offset: number;

  static of(limit, offset): PaginationQuery {
    const q = new PaginationQuery();
    q.limit = limit;
    q.offset = offset;
    return q;
  }

  static default(): PaginationQuery {
    const q = new PaginationQuery();
    q.limit = 4;
    q.offset = 0;
    return q;
  }
}