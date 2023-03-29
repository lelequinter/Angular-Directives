import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexDirective } from './directives/regex.directive';
import { MaxlengtDirective } from './directives/maxlengt.directive';
import { MaxValueDirective } from './directives/max-value.directive';
@NgModule({
  declarations: [RegexDirective,MaxlengtDirective, MaxValueDirective,],
  imports: [CommonModule],
  exports: [RegexDirective,MaxlengtDirective,MaxValueDirective],
})
export class SharedModule {}
