import {
  Injectable,
  signal,
  WritableSignal
} from '@angular/core';
import { IStudent } from "../../interface/IStudent.interface";
import { IAdministrator } from "../../interface/IAdministrator";
import { ICatedratic } from "../../interface/ICatedratic.interface";
import { ELoginProtectionsEnum } from "../../enum/ELoginProtections.enum";
import { ESessionType } from "../../enum/ESessionType.enum";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _user: WritableSignal<IStudent | ICatedratic | IAdministrator | null> = signal<IStudent | ICatedratic | IAdministrator | null>(null);
  private _sessionType: WritableSignal<ESessionType | null> = signal<ESessionType | null>(null);

  set setUser(profile: IStudent | ICatedratic | IAdministrator | null) {
    this._user.set(profile);
  }

  get getUser(): IStudent | ICatedratic | IAdministrator | null {
    return this._user();
  }

  set setSessionType(sessionType: ESessionType | null) {
    this._sessionType.set(sessionType);
  }

  get getSessionType(): ESessionType | null {
    return this._sessionType();
  }

  getSavedUser(): IStudent | ICatedratic | IAdministrator | null {
    const rawSession: string | null = localStorage.getItem(ELoginProtectionsEnum.SESSION_PROTECTION);
    rawSession != null ? this.setUser = JSON.parse(rawSession) : this.setUser = null;
    return this.getUser;
  }

  saveUser(user: IStudent | ICatedratic | IAdministrator): void {
    localStorage.setItem(ELoginProtectionsEnum.SESSION_PROTECTION, JSON.stringify(user));
  }

  saveSessionType(sessionType: ESessionType): void {
    localStorage.setItem('type', JSON.stringify(sessionType));
  }

  getSavedSessionType(): ESessionType | null {
    const rawSession: string | null = localStorage.getItem('type');
    rawSession != null ? this.setSessionType = JSON.parse(rawSession) : this.setSessionType = null;
    return this.getSessionType;
  }

  logout(): void {
    localStorage.clear();
  }

}
