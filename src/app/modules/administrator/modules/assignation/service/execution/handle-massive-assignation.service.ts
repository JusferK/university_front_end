import { inject, Injectable } from '@angular/core';
import { StudentCourseAssignationApiService } from "../api/student-course-assignation-api.service";
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { delay, forkJoin, Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandleMassiveAssignationService {

  private _studentCourseAssignationApiService: StudentCourseAssignationApiService = inject(StudentCourseAssignationApiService);

  handleMassiveAssignation(assignationArray: IStudentCourse[], methodHandler: () => void): Subscription {
    return forkJoin(this.createRequests(assignationArray))
      .pipe(
        delay(3000)
      )
      .subscribe({
        next: (data: IStudentCourse[]): void => methodHandler()
      });
  }

  private createRequests(assignationArray: IStudentCourse[]): Observable<IStudentCourse>[] {
    return assignationArray.map((assignation: IStudentCourse): Observable<IStudentCourse> => this._studentCourseAssignationApiService.assignStudentToCourse(assignation));
  }


}
