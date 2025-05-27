import {CanActivateFn, Router} from '@angular/router';
import {ProfileService} from "../service/execution/profile.service";
import {inject} from "@angular/core";
import {IStudent} from "../interface/IStudent.interface";
import {ICatedratic} from "../interface/ICatedratic.interface";
import {IAdministrator} from "../interface/IAdministrator";

export const loginGuard: CanActivateFn = (route, state) => {
  const _profileService: ProfileService = inject(ProfileService);
  const session: IStudent | ICatedratic | IAdministrator | null = _profileService.getSavedUser();
  return session === null;
};
