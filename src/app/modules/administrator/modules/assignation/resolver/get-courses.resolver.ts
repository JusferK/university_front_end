import { Resolve, ResolveFn } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { CourseApiService } from "../service/api/course-api.service";
import { delay, finalize, Observable } from "rxjs";
import { ICourse } from "../../../../../interface/ICourse.interface";
import { UtilService } from "../../../../../service/execution/util.service";

@Injectable()
export class GetCoursesResolver implements Resolve<ICourse> {

  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _utilService: UtilService = inject(UtilService);

  resolve(): Observable<ICourse> {

    this._utilService.showSpinner();

    return this._courseApiService.getCourses()
      .pipe(
        delay(1000),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
