import {Pipe, PipeTransform} from '@angular/core';
import {ESex} from "../../../enum/ESex.enum";

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: ESex): string {
    return value.toLowerCase() === ESex.MALE.toLowerCase() ? 'Masculino' : 'Femenino';
  }

}
