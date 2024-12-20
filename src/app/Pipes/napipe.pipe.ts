import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'napipe',
  standalone: true
})
export class NapipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == "" || value == null || value == undefined){
      return 'N/A';
     }
     else{
      return value;
     }
  }

}
