import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'textpretty'})
export class TextPrettyPipe implements PipeTransform {
  transform(value: string): string {
    const strings = value.split('_');
    let output = '';
    for (const str of strings){
      output += str + ' ';
    }
    return output;
  }
}
