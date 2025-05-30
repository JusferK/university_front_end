import { Resolve } from "@angular/router";
import { delay, finalize, map, Observable } from "rxjs";
import { AdministratorApiService } from "../service/api/administrator-api.service";
import { ProfileService } from "../../../../../service/execution/profile.service";
import { inject } from "@angular/core";
import { IAdministrator } from "../../../../../interface/IAdministrator";
import { UtilService } from "../../../../../service/execution/util.service";

export class GetAdministratorsResolver implements Resolve<IAdministrator[]> {

  private _administratorApiService: AdministratorApiService = inject(AdministratorApiService);
  private _profileService: ProfileService = inject(ProfileService);
  private _utilService: UtilService = inject(UtilService);

  resolve(): Observable<IAdministrator[]> {
    this._utilService.showSpinner();
    const profile: IAdministrator = this._profileService.getSavedUser() as IAdministrator;

    return this._administratorApiService.getAdministrators()
      .pipe(
        map((administrators: IAdministrator[]): IAdministrator[] => administrators.filter((admin: IAdministrator): boolean => admin.username !== profile.username)),
        delay(1000),
        finalize((): void => this._utilService.hideSpinner())
      );
  }

}
