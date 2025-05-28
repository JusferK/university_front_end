import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from "../service/execution/profile.service";
import { inject } from "@angular/core";
import { IStudent } from "../interface/IStudent.interface";
import { ICatedratic } from "../interface/ICatedratic.interface";
import { IAdministrator } from "../interface/IAdministrator";
import { ESessionType } from '../enum/ESessionType.enum';

export const sessionGuard: CanActivateFn = (route, state) => {

  const _router: Router = inject(Router);
  const _profileService: ProfileService = inject(ProfileService);
  const session: IStudent | ICatedratic | IAdministrator | null = _profileService.getSavedUser();
  const sessionType: ESessionType | null = _profileService.getSavedSessionType();

  if (session === null && sessionType === null) {
    _router.navigate([`/login`]);
    return false;
  }

  return true
};
