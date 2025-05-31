import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ProfileService } from "../../../../service/execution/profile.service";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  private _profileService: ProfileService = inject(ProfileService);
  catedraticProfile: WritableSignal<ICatedratic> = signal<ICatedratic>(this._profileService.getSavedUser() as ICatedratic)
  legend: Signal<string> = computed((): string => `Hola ${this.catedraticProfile().name} ${this.catedraticProfile().lastName}, este es tu perfil`);

}
