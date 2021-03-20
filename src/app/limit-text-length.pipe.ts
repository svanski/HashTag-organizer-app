import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limitTextLength' })
export class LimitTextLengthPipe implements PipeTransform {

  transform(text: string | null | undefined, maxCharCount: Number): string | undefined | null {
    if (!text) {
      return text;
    }

    return `${text.slice(0, maxCharCount.valueOf())}...`;
  }

}
