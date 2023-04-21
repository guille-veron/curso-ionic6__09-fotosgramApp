import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coords'
})
export class CoordsPipe implements PipeTransform {

  transform(val:string):string {
    if(!val) return '';
    return `(${val.split(',').map(v => v.slice(0,v.indexOf('.')+3)).join(',')})`;
  }

}
