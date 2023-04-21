import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { CoordsPipe } from './coords.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    CoordsPipe,
    ImageSanitizerPipe
  ],
  exports: [
    DomSanitizerPipe,
    CoordsPipe,
    ImageSanitizerPipe
  ],
  imports: []
})
export class PipesModule { }
