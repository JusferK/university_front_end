import { inject, Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ICourse, ICourseWithStudents } from "../../../interface/ICourse.interface";
import { CourseApiService } from "../../../service/api/course-api.service";
import { UtilService } from "../../../service/execution/util.service";
import { CatedraticApiService } from "../../../service/api/catedratic-api.service";
import {
  HandleMassiveStudentsService
} from "../../administrator/modules/assignation/service/execution/handle-massive-students.service";
import { delay, finalize, forkJoin, map, Observable, of, switchMap } from "rxjs";
import { ICatedratic } from "../../../interface/ICatedratic.interface";
import { IStudent } from "../../../interface/IStudent.interface";
import { ProfileService } from "../../../service/execution/profile.service";

@Injectable()
export class GetCourseDataResolver implements Resolve<ICourse> {

  private _utilService: UtilService = inject(UtilService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _handleMassiveStudentsService: HandleMassiveStudentsService = inject(HandleMassiveStudentsService);
  private _profileService: ProfileService = inject(ProfileService);

  resolve(): Observable<any> {

    this._utilService.showSpinner();

    const catedratic: ICatedratic = this._profileService.getSavedUser() as ICatedratic;
    const courses$: Observable<ICourse[]> = catedratic.courses.length > 0 ? of(catedratic.courses) : of([]);

    return courses$
      .pipe(
        switchMap((courses: ICourse[]): Observable<ICourseWithStudents[]> => {
          const transformedCourses$: Observable<ICourseWithStudents>[] = courses.map((course: ICourse) => {
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
