import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToCop'
})
export class ConvertToCopPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const cop: number = value/100;

    return cop || 0;
  }

}
