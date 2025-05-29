import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITransformedUsers } from "../../interface/ITransformedUsers.interface";
import { ITransformedUsersArguments } from "../../interface/ITransformedUsersArguments.interface";
import { isStudent, IStudent } from "../../../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../../../interface/ICatedratic.interface";
import { ISelect } from "../../../../../../interface/ISelect.interface";

@Injectable({
  providedIn: 'root'
})
export class TransformUsersOptionsService {

  transformUsersOptions({ users }: ITransformedUsersArguments): ITransformedUsers {

    const students: WritableSignal<ISelect<IStudent>[]> = signal<ISelect<IStudent>[]>([]);
    const catedratics: WritableSignal<ISelect<ICatedratic>[]> = signal<ISelect<ICatedratic>[]>([]);

    students.set(this.transformToOptions(users.students));
    catedratics.set(this.transformToOptions(users.catedratics));

    return { catedratics, students };
  }

  private transformToOptions<T extends IStudent | ICatedratic>(data: T[]): ISelect<T>[] {
    return data.map((user: T): ISelect<T> => {
      if (isStudent(user)) {
        const student = user as IStudent;
        return { label: `${student.name} ${student.lastName} - carne ${student.studentId}`, value: student as T };
      } else {
        const catedratic = user as ICatedratic;
        return {
          label: `${catedratic.name} ${catedratic.lastName} - ID ${catedratic.catedraticId}`,
          value: catedratic as T
        };
      }
    });
  }

}
