import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ProfileService } from '../../../../service/execution/profile.service';
import { IStudent } from '../../../../interface/IStudent.interface';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  private _profileService: ProfileService = inject(ProfileService);
  studentProfile: WritableSignal<IStudent> = signal<IStudent>(this._profileService.getSavedUser() as IStudent);
  legend: Signal<string> = computed((): string => `Hola ${this.studentProfile().name} ${this.studentProfile().lastName}, este es tu perfil`);

}
