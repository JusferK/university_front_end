import { inject, Injectable } from '@angular/core';
import { StudentApiService } from "../../../../service/api/student-api.service";
import { IStudent } from "../../../../../../interface/IStudent.interface";
import { delay, forkJoin, Observable } from "rxjs";
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";

@Injectable({
  providedIn: 'root'
})
export class HandleMassiveStudentsService {

  private _studentApiService: StudentApiService = inject(StudentApiService);

  handleMassiveStudents(students: IStudentCourse[]): Observable<IStudent[]> {
    return forkJoin(students.map((student: IStudentCourse): Observable<IStudent> => this.transformedToRequest(student)));
  }

  private transformedToRequest(student: IStudentCourse): Observable<IStudent> {
    return this._studentApiService.getStudent(student.studentId!.toString());
  }

}
