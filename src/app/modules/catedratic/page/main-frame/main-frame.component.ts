import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuItem } from "primeng/api";
import CatedraticMenuBar from '../../../../../assets/json/catedratic-menubar-options.json';
import { ProfileService } from "../../../../service/execution/profile.service";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import items from "../../../../../assets/json/catedratic-menubar-options.json";
import { Router } from "@angular/router";
import { UtilService } from "../../../../service/execution/util.service";

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css'
})
export class MainFrameComponent {

  items: MenuItem[] = CatedraticMenuBar;
  userInitial: WritableSignal<string> = signal<string>('');

  private readonly _userProfileService: ProfileService = inject(ProfileService);
  private readonly _router: Router = inject(Router);
  private readonly _utilService: UtilService = inject(UtilService);

  constructor() {
    this.getUserInitial();
  }

  logoutHandler(): void {
    this._utilService.showSpinner();
    this._userProfileService.logout();
    this._router.navigate(['/login']).then(() => this._utilService.hideSpinner());
  }

  private getUserInitial(): void {
    const user: ICatedratic = this._userProfileService.getSavedUser() as ICatedratic;
    this.userInitial.set(user.name.charAt(0));
  }

}
