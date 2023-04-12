import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "codeSize" })
export class CodeSizePipe implements PipeTransform {
  private KB_SIZE: number = 1000;
  private MB_SIZE: number = 1000000;

  transform(bytes: number): string {
    if (!bytes) {
      return "";
    }

    const bytesStrLen: number = bytes.toString().length;

    // less than one kB
    if (bytesStrLen <= 3) {
      return `${bytes} B`;
    }

    // from one kB and less than one MB
    if (bytesStrLen > 3 && bytesStrLen < 7) {
      return `${(bytes / this.KB_SIZE).toFixed(1)} kB`
    }

    return `${(bytes / this.MB_SIZE).toFixed(1)} MB`;
  }
}