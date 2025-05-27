import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {IStudent} from "../../../../interface/IStudent.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  addStudent(user: IStudent): Observable<IStudent> {
    return this._httpClient.post<IStudent>('/student/new-student', user);
  }

  getStudents(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>('/student/get-students');
  }

}
