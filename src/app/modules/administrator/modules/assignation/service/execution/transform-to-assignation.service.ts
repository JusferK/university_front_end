import { Injectable } from '@angular/core';
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { IStudent } from "../../../../../../interface/IStudent.interface";

@Injectable({
  providedIn: 'root'
})
export class TransformToAssignationService {

  transformMassiveToAssignation(students: IStudent[], courseId: number): IStudentCourse[] {
    return students.map((student: IStudent): IStudentCourse => this.transformAssignation(student, courseId));
  }

  private transformAssignation(student: IStudent, courseId: number): IStudentCourse {
    return {
      courseId,
      studentId: student.studentId!
    }
  }

}
