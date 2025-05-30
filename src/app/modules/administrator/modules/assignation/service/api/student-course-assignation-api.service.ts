import { inject, Injectable } from '@angular/core';
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentCourseAssignationApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  assignStudentToCourse(assignation: IStudentCourse): Observable<IStudentCourse> {
    return this._httpClient.post<IStudentCourse>('/assignment/assign-student-to-course', assignation);
  }

  unAssignStudentToCourse(assignation: IStudentCourse): Observable<IStudentCourse> {
    return this._httpClient.put<IStudentCourse>('/assignment/unassign-student-to-course', assignation);
  }

}
