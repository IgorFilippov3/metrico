import { CodeCoverageDetails } from "src/_common/models/code-coverage-details.model";

export class CodeCoverageDetailsDto {
  unusedBytes: number;
  bytes: number;
  name: string;

  static of({ unusedBytes, bytes, name }: CodeCoverageDetails) {
    const c = new CodeCoverageDetailsDto();
    c.unusedBytes = unusedBytes;
    c.bytes = bytes;
    c.name = name;
    return c;
  }
}