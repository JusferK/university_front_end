import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn
} from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { StudentApiService } from "../service/api/student-api.service";
import { CatedraticApiService } from "../service/api/catedratic-api.service";
import { Observable, forkJoin, delay, finalize } from "rxjs";
import { UtilService } from "../../../service/execution/util.service";

@Injectable()
export class GetDataListResolver implements Resolve<any> {

  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _utilService: UtilService = inject(UtilService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    this._utilService.showSpinner();

    return forkJoin({
      students: this._studentApiService.getStudents(),
      catedratics: this._catedraticApiService.getCatedratics()
    })
      .pipe(
        delay(1000),
        finalize(() => this._utilService.hideSpinner())
      );
  }

}
