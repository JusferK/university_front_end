import { Resolve } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { CourseApiService } from "../service/api/course-api.service";
import {
  delay,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  switchMap
} from "rxjs";
import { ICourse, ICourseWithStudents } from "../../../../../interface/ICourse.interface";
import { UtilService } from "../../../../../service/execution/util.service";
import { CatedraticApiService } from "../../../../../service/api/catedratic-api.service";
import { ICatedratic } from "../../../../../interface/ICatedratic.interface";
import { HandleMassiveStudentsService } from "../service/execution/handle-massive-students.service";
import { IStudent } from "../../../../../interface/IStudent.interface";

@Injectable()
export class GetCoursesResolver implements Resolve<ICourse> {

  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _utilService: UtilService = inject(UtilService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _handleMassiveStudentsService: HandleMassiveStudentsService = inject(HandleMassiveStudentsService);

  resolve(): Observable<any> {

    this._utilService.showSpinner();

    return this._courseApiService.getCourses()
      .pipe(
        switchMap((courses: ICourse[]) => {
          const transformedCourses$ = courses.map((course: ICourse) => {
            const catedratic$: Observable<ICatedratic> = this._catedraticApiService.getCatedratic(course.catedraticId.toString());

            const students$: Observable<IStudent[]> = course.students.length > 0 ? this._handleMassiveStudentsService.handleMassiveStudents(course.students) : of([]);

            return forkJoin([catedratic$, students$])
              .pipe(
                map(([catedratic, fullStudents]: [ICatedratic, IStudent[]]): ICourseWithStudents => ({
                  ...course,
                  catedratic,
                  fullStudents
                }) as ICourseWithStudents)
              );
          });

          return transformedCourses$.length > 0 ? forkJoin(transformedCourses$) : of([]);
        }),
        delay(3000),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
