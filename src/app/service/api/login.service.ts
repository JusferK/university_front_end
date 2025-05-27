import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap} from "rxjs";
import {IStudent} from "../../interface/IStudent.interface";
import {ICatedratic} from "../../interface/ICatedratic.interface";
import {IAdministrator} from "../../interface/IAdministrator";
import {ILogin} from "../../interface/ILogin.interface";
import {LoginHandlerService} from "../execution/login-handler.service";
import {ESessionType} from "../../enum/ESessionType.enum";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _httpClient: HttpClient = inject(HttpClient);
  private _loginHandlerService: LoginHandlerService = inject(LoginHandlerService);

  login(login: ILogin): Observable<IStudent | ICatedratic | IAdministrator> {
    return this._httpClient.post<IStudent | ICatedratic | IAdministrator>('/authentication/login', login)
      .pipe(
        tap((response: IStudent | ICatedratic | IAdministrator): void => {
          if (response.hasOwnProperty('studentId')) this._loginHandlerService.handleLogin(ESessionType.STUDENT, response);
          if (response.hasOwnProperty('catedraticId')) this._loginHandlerService.handleLogin(ESessionType.CATEDRATIC, response);
          if (response.hasOwnProperty('id')) this._loginHandlerService.handleLogin(ESessionType.ADMINISTRATOR, response);
        })
      );
  }

}
