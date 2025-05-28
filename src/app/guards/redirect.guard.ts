import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../service/execution/profile.service';

export const redirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const profileService = inject(ProfileService);

  const user = profileService.getSavedUser();
  const session = profileService.getSavedSessionType();

  if (user && session) {
    router.navigate([`/${session}`]);
    return false;
  }

  router.navigate(['/login']);
  return false;
};

