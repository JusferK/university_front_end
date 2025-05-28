import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IStudent } from "../../../../interface/IStudent.interface";
import { delay, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  addStudent(user: IStudent): Observable<IStudent> {
    return this._httpClient.post<IStudent>('/student/new-student', user)
      .pipe(
        delay(2000)
      );
  }

  getStudents(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>('/student/get-students');
  }

  getStudent(id: string): Observable<IStudent> {
    return this._httpClient.get<IStudent>(`/student/get-student-by-id/${id}`);
  }

  updateStudent(student: IStudent): Observable<IStudent> {
    return this._httpClient.put<IStudent>('/student/update-student', student)
      .pipe(
        delay(2000)
      );
  }

  removeStudent(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/student/delete-student/${id}`)
      .pipe(
        delay(2000)
      );
  }

}
