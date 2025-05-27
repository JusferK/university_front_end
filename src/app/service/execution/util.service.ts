import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  showLoading: WritableSignal<boolean> = signal<boolean>(false);

  showSpinner(): void {
    this.showLoading.set(true);
  }

  hideSpinner(): void {
    this.showLoading.set(false);
  }

}
