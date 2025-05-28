import {
  Component,
  inject, OnInit, signal, WritableSignal,
} from '@angular/core';
import { MenuItem } from "primeng/api";
import MenuItems from '../../../../../assets/json/menu-items-administrator.json';
import ProfileMenuItems from '../../../../../assets/json/profile-menu-items.json';
import { UtilService } from "../../../../service/execution/util.service";
import { ProfileService } from "../../../../service/execution/profile.service";
import { IStudent } from "../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import { IAdministrator } from "../../../../interface/IAdministrator";
import { ESessionType } from "../../../../enum/ESessionType.enum";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  menuItems: MenuItem[] = MenuItems;
  profileMenuItems: MenuItem[] = ProfileMenuItems;
  buttonLabel: WritableSignal<string> = signal<string>('');
  private _profileService: ProfileService = inject(ProfileService);
  private _router: Router = inject(Router);

  ngOnInit(): void {
    this.setLabel();
    this.addLogoutHandler();
  }

  private setLabel(): void {
    let profile: IStudent | ICatedratic | IAdministrator;
    const sessionType: ESessionType | null = this._profileService.getSavedSessionType();

    if (sessionType !== null) {
      switch (sessionType) {
        case ESessionType.ADMINISTRATOR:
          profile = this._profileService.getSavedUser() as IAdministrator;
          this.buttonLabel.set(profile.username);
          break;
        case ESessionType.CATEDRATIC:
          profile = this._profileService.getSavedUser() as ICatedratic;
          this.buttonLabel.set(profile.name)
          break;
        case ESessionType.STUDENT:
          profile = this._profileService.getSavedUser() as IStudent;
          this.buttonLabel.set(profile.name)
          break;
      }
    }

  }

  private logoutHandler(): void {
    this._profileService.logout();
    this._router.navigate(['/login']).then(() => {
    });
  }

  private addLogoutHandler(): void {
    const item: MenuItem = this.profileMenuItems.find((itemIteration: MenuItem) => itemIteration.label === 'Logout')!;
    item.command = this.logoutHandler.bind(this);
    this.profileMenuItems = this.profileMenuItems.map((itemIteration: MenuItem) => {
      if (itemIteration.label === 'Logout') return item;
      return itemIteration;
    });
  }

}
