import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpacing'
})
export class AddSpacingPipe implements PipeTransform {

  transform(value: number | null, ...args: unknown[]): string {
    if (value === null) {
      return "";
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
