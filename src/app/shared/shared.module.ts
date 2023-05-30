import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexDirective } from './directives/regex.directive';
import { MaxlengtDirective } from './directives/maxlengt.directive';
import { MaxValueDirective } from './directives/max-value.directive';
import { RyUnableClickDirective } from './directives/ry-unable-click.directive';
import { ConvertToCopPipe } from './pipes/convert-to-cop.pipe';
@NgModule({
  declarations: [
    RegexDirective,
    MaxlengtDirective,
    MaxValueDirective,
    RyUnableClickDirective,
    ConvertToCopPipe,
  ],
  imports: [CommonModule],
  exports: [
    RegexDirective,
    MaxlengtDirective,
    MaxValueDirective,
    RyUnableClickDirective,
    ConvertToCopPipe,
  ],
})
export class SharedModule {}
