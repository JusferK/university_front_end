import {
  ActivatedRouteSnapshot,
  Resolve, Router,
  RouterStateSnapshot
} from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { StudentApiService } from "../../../service/api/student-api.service";
import { CatedraticApiService } from "../../../service/api/catedratic-api.service";
import { UtilService } from "../../../service/execution/util.service";
import { catchError, delay, finalize, forkJoin, Observable, of, tap } from "rxjs";

@Injectable()
export class SearchUserResolver implements Resolve<any> {

  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _utilService: UtilService = inject(UtilService);
  private _router: Router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this._utilService.showSpinner();
    const id = route.params['id'];
    const userType = route.params['userType'];

    return forkJoin({
      student: this._studentApiService.getStudent(id).pipe(catchError((): Observable<null> => of(null))),
      catedratic: this._catedraticApiService.getCatedratic(id).pipe(catchError((): Observable<null> => of(null))),
      userType: of(userType)
    })
      .pipe(
        delay(1000),
        tap((data) => {
          if (data.student === null && data.catedratic === null) this._router.navigate(['/administrator/']);
        }),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
