import { inject, Injectable } from '@angular/core';
import { StudentCourseAssignationApiService } from "../api/student-course-assignation-api.service";
import { IMassiveAssignationApiRequest } from "../../interface/IMassiveAssigntionApiRequest.interface";
import { finalize, forkJoin, of } from "rxjs";
import { UtilService } from "../../../../../../service/execution/util.service";

@Injectable({
  providedIn: 'root'
})
export class HandleMassiveAssignationApiRequestsService {

  private readonly _studentCourseAssignationApiService: StudentCourseAssignationApiService = inject(StudentCourseAssignationApiService);
  private readonly _utilService: UtilService = inject(UtilService);

  placeRequests({ unAssignRequests, assignRequests, methodHandler }: IMassiveAssignationApiRequest) {

    this._utilService.showSpinner();

    const assignationRequests$ = assignRequests.length > 0 ? (
      forkJoin(
        assignRequests.map(assignation =>
          this._studentCourseAssignationApiService.assignStudentToCourse(assignation)
        )
      )
    ) : (
      of(null)
    );

    const unAssignationRequests$ = unAssignRequests.length > 0 ? (
      forkJoin(
        unAssignRequests.map(assignation =>
          this._studentCourseAssignationApiService.unAssignStudentToCourse(assignation)
        )
      )
    ) : (
      of(null)
    );

    return forkJoin({
      assignationRequests: assignationRequests$,
      unAssignationRequests: unAssignationRequests$
    })
      .pipe(
        finalize(() => this._utilService.hideSpinner())
      )
      .subscribe({
        next: (): void => methodHandler()
      });
  }

}
