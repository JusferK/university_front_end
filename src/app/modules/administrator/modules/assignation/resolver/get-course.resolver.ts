import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from "@angular/router";
import { CourseApiService } from "../../../../../service/api/course-api.service";
import { inject } from "@angular/core";
import { UtilService } from "../../../../../service/execution/util.service";
import {
  catchError,
  delay,
  finalize,
  forkJoin,
  Observable,
  of
} from "rxjs";
import { ICourse } from "../../../../../interface/ICourse.interface";
import { ICatedratic } from "../../../../../interface/ICatedratic.interface";
import { CatedraticApiService } from "../../../../../service/api/catedratic-api.service";

export class GetCourseResolver implements Resolve<any> {

  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _catedraticsApiService: CatedraticApiService = inject(CatedraticApiService);
  private _utilService: UtilService = inject(UtilService);
  private _router: Router = inject(Router);

  resolve(route: ActivatedRouteSnapshot) {

    this._utilService.showSpinner();
    const id: number = route.params['id'];

    const courseRequest$: Observable<ICourse> = this._courseApiService.getCourse(id);
    const catedraticsRequest$: Observable<ICatedratic[]> = this._catedraticsApiService.getCatedratics();

    return forkJoin({
      course: courseRequest$,
      catedratics: catedraticsRequest$
    })
      .pipe(
        catchError(() => {
          this._router.navigate(['/administrator/assignation/']);
          return of(null);
        }),
        delay(1000),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
