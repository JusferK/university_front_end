import { Component, inject, signal, WritableSignal } from '@angular/core';
import StudentMenuOptions from '../../../../../assets/json/student-menu-options.json';
import { ProfileService } from "../../../../service/execution/profile.service";
import { IStudent } from "../../../../interface/IStudent.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-frame-student',
  templateUrl: './main-frame-student.component.html',
  styleUrl: './main-frame-student.component.css'
})
export class MainFrameStudentComponent {

  private _profileService: ProfileService = inject(ProfileService);
  private readonly _student: WritableSignal<IStudent> = signal<IStudent>(this._profileService.getSavedUser() as IStudent);
  private readonly _router: Router = inject(Router);

  items = StudentMenuOptions;

  userInitial: WritableSignal<string> = signal<string>(`${this._student().name.charAt(0)}`);

  logoutHandler(): void {
    this._profileService.logout();
    this._router.navigate(['/login']).then(() => {
    });
  }

}
