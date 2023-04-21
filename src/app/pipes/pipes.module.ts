import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { CoordsPipe } from './coords.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    CoordsPipe
  ],
  exports: [
    DomSanitizerPipe,
    CoordsPipe
  ],
  imports: []
})
export class PipesModule { }
