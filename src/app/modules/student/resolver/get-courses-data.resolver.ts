import { Resolve } from '@angular/router';
import { delay, finalize, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ProfileService } from '../../../service/execution/profile.service';
import { inject } from '@angular/core';
import { IStudent } from '../../../interface/IStudent.interface';
import { ICourse, ICourseWithStudents } from '../../../interface/ICourse.interface';
import { IStudentCourse } from '../../../interface/IStudentCourse.interface';
import { CourseApiService } from '../../../service/api/course-api.service';
import { ICatedratic } from '../../../interface/ICatedratic.interface';
import { UtilService } from '../../../service/execution/util.service';
import { CatedraticApiService } from '../../../service/api/catedratic-api.service';
import {
  HandleMassiveStudentsService
} from '../../administrator/modules/assignation/service/execution/handle-massive-students.service';

export class GetCoursesDataResolver implements Resolve<any> {

  private _profileService: ProfileService = inject(ProfileService);
  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _utilService: UtilService = inject(UtilService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _handleMassiveStudentsService: HandleMassiveStudentsService = inject(HandleMassiveStudentsService);

  resolve(): Observable<any> {

    this._utilService.showSpinner();
    const studentProfile: IStudent = this._profileService.getSavedUser() as IStudent;
    const courses$: Observable<ICourse>[] = studentProfile.courses.map((relation: IStudentCourse): Observable<ICourse> => this._courseApiService.getCourse(relation.courseId));

    const requests$: Observable<ICourse[]> = forkJoin(courses$);

    return requests$
      .pipe(
        switchMap((courses: ICourse[]): Observable<ICourseWithStudents[]> => {
          const transformedCourses$: Observable<ICourseWithStudents>[] = courses.map((course: ICourse) => {
            const catedratic$: Observable<ICatedratic> = this._catedraticApiService.getCatedratic(course.catedraticId.toString());

            const fellows: IStudentCourse[] = course.students.filter((fellow: IStudentCourse): boolean => fellow.studentId !== studentProfile.studentId);
            const students$: Observable<IStudent[]> = fellows.length > 0 ? this._handleMassiveStudentsService.handleMassiveStudents(fellows) : of([]);

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
