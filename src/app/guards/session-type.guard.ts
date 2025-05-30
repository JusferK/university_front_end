import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ProfileService } from "../service/execution/profile.service";

@Injectable()
export class SessionTypeGuard implements CanActivate {

  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const session = this._profileService.getSavedUser();
    const sessionType = this._profileService.getSavedSessionType();
    const currentUrl: string = state.url;

    if (!session && !sessionType) return false;
    if (currentUrl.includes(sessionType as string)) return true;

    this._router.navigate([`/${sessionType}`]).then((): void => {
    });
    return false;

  }

}
