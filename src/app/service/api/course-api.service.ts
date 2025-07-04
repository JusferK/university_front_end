import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, Observable } from "rxjs";
import { ICourse } from "../../interface/ICourse.interface";

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  getCourses(): Observable<ICourse[]> {
    return this._httpClient.get<ICourse[]>('/course/get-courses');
  }

  getCourse(id: number): Observable<ICourse> {
    return this._httpClient.get<ICourse>(`/course/get-course-by-id/${id}`);
  }

  update(course: ICourse): Observable<ICourse> {
    return this._httpClient.put<ICourse>('/course/update-course', course)
      .pipe(
        delay(2000)
      );
  }

  save(course: ICourse): Observable<ICourse> {
    return this._httpClient.post<ICourse>('/course/new-course', course);
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/course/remove-course/${id}`)
      .pipe(
        delay(2000)
      )
  }

}
