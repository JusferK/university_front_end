import { inject, Injectable } from '@angular/core';
import { ESessionType } from "../../enum/ESessionType.enum";
import { IStudent } from "../../interface/IStudent.interface";
import { ICatedratic } from "../../interface/ICatedratic.interface";
import { IAdministrator } from "../../interface/IAdministrator";
import { Router } from "@angular/router";
import { ProfileService } from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {

  private _router: Router = inject(Router);
  private _profileService: ProfileService = inject(ProfileService);

  handleLogin(sessionType: ESessionType, data: IStudent | ICatedratic | IAdministrator): void {
    this.saveSessionType(sessionType);
    this._profileService.saveUser(data);
  }

  private saveSessionType(sessionType: ESessionType): void {
    switch (sessionType) {
      case ESessionType.ADMINISTRATOR:
        this._profileService.saveSessionType(ESessionType.ADMINISTRATOR);
        this._router.navigate([`/${ESessionType.ADMINISTRATOR}`]).then(() => {});
        break;
      case ESessionType.CATEDRATIC:
        this._profileService.saveSessionType(ESessionType.CATEDRATIC);
        this._router.navigate([`/${ESessionType.CATEDRATIC}`]).then(() => {});
        break
      case ESessionType.STUDENT:
        this._profileService.saveSessionType(ESessionType.STUDENT);
        this._router.navigate([`/${ESessionType.STUDENT}`]).then(() => {});
        break;
    }
  }

}
