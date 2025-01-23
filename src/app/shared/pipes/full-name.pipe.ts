import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';

@Pipe({
  name: 'fullName',
  standalone: false,
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student): string {
    // let result = value;
    // if (type === 'lowercase') {
    //   result = result.toLowerCase();
    // } else {
    //   result = result.toUpperCase();
    // }
    return `${value.lastName.toUpperCase()}, ${value.name}`;
  }
}
