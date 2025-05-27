import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn
} from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { StudentApiService } from "../service/api/student-api.service";
import { CatedraticApiService } from "../service/api/catedratic-api.service";
import { Observable, forkJoin } from "rxjs";

@Injectable()
export class GetDataListResolver implements Resolve<any> {

  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin({
      students: this._studentApiService.getStudents(),
      catedratics: this._catedraticApiService.getCatedratics()
    })
  }

}
