import { Injectable } from '@angular/core';
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { IStudent } from "../../../../../../interface/IStudent.interface";
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { IAssignationTransformation } from "../../interface/IAssignationTransformation.interface";

@Injectable({
  providedIn: 'root'
})
export class FilterUnassignedAndAssignedStudentsService {

  filter(course: ICourse, students: IStudent[]): IAssignationTransformation {
    const studentsIds: number[] = this.getStudentsIds(students);
    const studentsRelation: number[] = this.getStudentsIds(course.students as unknown as IStudent[]);

    const unassignedStudentsIds: number[] = studentsIds.filter((studentId: number): boolean => !studentsRelation.includes(studentId));
    const assignedStudentsIds: number[] = studentsIds.filter((studentId: number): boolean => studentsRelation.includes(studentId));

    const unassignedStudents: IStudent[] = students.filter((student: IStudent): boolean => unassignedStudentsIds.includes(student.studentId!));
    const assignedStudents: IStudent[] = students.filter((student: IStudent): boolean => assignedStudentsIds.includes(student.studentId!));

    return { assignedStudents, unassignedStudents };
  }

  private getStudentsIds(students: IStudent[]): number[] {
    return students.map((student): number => student.studentId!);
  }


}
