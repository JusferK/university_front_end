import { Resolve } from "@angular/router";
import { CourseApiService } from "../../../../../service/api/course-api.service";
import { inject, Injectable } from "@angular/core";
import { StudentApiService } from "../../../../../service/api/student-api.service";
import { UtilService } from "../../../../../service/execution/util.service";
import { delay, finalize, forkJoin, Observable } from "rxjs";
import { IStudent } from "../../../../../interface/IStudent.interface";
import { ICourse } from "../../../../../interface/ICourse.interface";

@Injectable()
export class CoursesAndStudentsResolver implements Resolve<any> {

  private _coursesApiService: CourseApiService = inject(CourseApiService);
  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _utilService: UtilService = inject(UtilService);

  resolve(): Observable<any> {

    this._utilService.showSpinner();
    const students$: Observable<IStudent[]> = this._studentApiService.getStudents();
    const courses$: Observable<ICourse[]> = this._coursesApiService.getCourses();

    return forkJoin({
      students: students$,
      courses: courses$
    })
      .pipe(
        delay(1000),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
