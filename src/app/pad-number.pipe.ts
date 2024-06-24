import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padNumber'
})
export class PadNumberPipe implements PipeTransform {

  transform(value: number, length: number = 4): string {
    return value.toString().padStart(length, '0');
  }

}
