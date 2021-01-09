import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'textpretty'})
export class TextPrettyPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('_', ' ');
  }
}
