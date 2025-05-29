import { Pipe, PipeTransform } from '@angular/core';
import { EDegree } from "../modules/administrator/enums/EDegree.enum";

@Pipe({
  name: 'degree'
})
export class DegreePipe implements PipeTransform {

  transform(value: string): string {
    switch (value.toLowerCase()) {
      case EDegree.Bachelor.toLowerCase():
        return 'Bachillerato';
      case EDegree.Master.toLowerCase():
        return 'Maestria';
      case EDegree.Doctor.toLowerCase():
        return 'Doctorado';
      case EDegree.PhD.toLowerCase():
        return 'Doctorado';
      case EDegree.Professor.toLowerCase():
        return 'Profesor';
      case EDegree.MSc.toLowerCase():
        return 'Maestria en Ciencias';
      case EDegree.MBA.toLowerCase():
        return 'Maestria en Administracion';
      case EDegree.Postdoc.toLowerCase():
        return 'Postdoctorado';
      case EDegree.Engineer.toLowerCase():
        return 'Ingeniero';
    }
    return '';
  }

}
