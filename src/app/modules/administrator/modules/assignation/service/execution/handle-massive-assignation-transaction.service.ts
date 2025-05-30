import {
  inject,
  Injectable,
  signal,
  WritableSignal
} from '@angular/core';
import { IMassiveAssignationArguments } from "../../interface/IMassiveAssignationArguments.interface";
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { IStudent } from "../../../../../../interface/IStudent.interface";
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { HandleMassiveAssignationApiRequestsService } from "./handle-massive-assignation-api-requests.service";

@Injectable({
  providedIn: 'root'
})
export class HandleMassiveAssignationTransactionService {

  private readonly _studentsCourseRelationsIds: WritableSignal<number[]> = signal<number[]>([]);
  private readonly _handleMassiveAssignationApiRequest: HandleMassiveAssignationApiRequestsService = inject(HandleMassiveAssignationApiRequestsService);

  handler({ studentsUnassigned, studentsAssigned, course, methodHandler }: IMassiveAssignationArguments) {

    this.setStudentsCourseRelationsIds(course);
    const newAssignees: IStudent[] = this.filterNewAssignees(studentsAssigned);
    const unAssignees: IStudent[] = this.filterUnAssignees(studentsUnassigned);

    const assignRequests: IStudentCourse[] = this.convertStudentList(course.courseId!, newAssignees);
    const unAssignRequests: IStudentCourse[] = this.convertStudentList(course.courseId!, unAssignees);

    return this._handleMassiveAssignationApiRequest.placeRequests({
      assignRequests,
      unAssignRequests,
      methodHandler
    });
  }

  private filterNewAssignees(students: IStudent[]): IStudent[] {
    return students.filter((student: IStudent): boolean => !this._studentsCourseRelationsIds().includes(student.studentId!));
  }

  private filterUnAssignees(unAssignees: IStudent[]): IStudent[] {
    if (unAssignees.length === 0) return [];
    return unAssignees.filter((student: IStudent): boolean => this._studentsCourseRelationsIds().includes(student.studentId!));
  }

  private setStudentsCourseRelationsIds(course: ICourse): void {
    this._studentsCourseRelationsIds.set(course.students.map((relation: IStudentCourse): number => relation.studentId));
  }

  private convertToRequest(courseId: number, studentId: number): IStudentCourse {
    return {
      courseId,
      studentId
    };
  }

  private convertStudentList(courseId: number, students: IStudent[]): IStudentCourse[] {
    return students.map((student: IStudent): IStudentCourse => this.convertToRequest(courseId, student.studentId!));
  }

}
