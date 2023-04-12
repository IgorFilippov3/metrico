import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "round" })
export class MathRoundPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}