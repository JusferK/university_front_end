import {inject, Injectable} from '@angular/core';
import { ELoginProtectionsEnum } from "../../enum/ELoginProtections.enum";
import { IStudent } from "../../interface/IStudent.interface";
import { IAdministrator } from "../../interface/IAdministrator";
import { ICatedratic } from "../../interface/ICatedratic.interface";
import {ESessionType} from "../../enum/ESessionType.enum";
import {Router} from "@angular/router";
import {ProfileService} from "./profile.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectToSessionService {

  private _router: Router = inject(Router);
  private _profileService: ProfileService = inject(ProfileService);

  redirect(): void {

    const url: string | null = this._router.url;
    const session: ESessionType | null = this._profileService.getSavedSessionType();
    const user: IStudent | ICatedratic | IAdministrator | null = this._profileService.getSavedUser();

    if ((url === '/login' || url === '/' || url === ''.trim()) && user) {
      this._router.navigate([`/${session}`]).then(() => {});
    } else {
      this._router.navigate(['/login']).then(() => {});
    }

  }

}
