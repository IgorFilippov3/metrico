import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "titleFromUrl" })
export class TitleFromUrlPipe implements PipeTransform {
  transform(url: string): string {
    const nameInArray: string[] = url.split("/").slice(-1);
    return nameInArray.length ? nameInArray[0] : ""; 
  }
}