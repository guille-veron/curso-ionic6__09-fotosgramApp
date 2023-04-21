import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer:DomSanitizer){}

  transform(img: string) {
    const domImg = `background-image: url('/assets/perro-{{image}}.jpg');`
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
