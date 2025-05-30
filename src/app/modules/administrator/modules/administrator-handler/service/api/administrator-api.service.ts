import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, Observable } from "rxjs";
import { IAdministrator } from "../../../../../../interface/IAdministrator";

@Injectable({
  providedIn: 'root'
})
export class AdministratorApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  getAdministrators(): Observable<IAdministrator[]> {
    return this._httpClient.get<IAdministrator[]>('/user/get-users');
  }

  getAdministrator(username: string): Observable<IAdministrator> {
    return this._httpClient.get<IAdministrator>(`/user/get-user-by-id/${username}`);
  }

  save(administrator: IAdministrator): Observable<IAdministrator> {
    return this._httpClient.post<IAdministrator>('/user/new-user', administrator)
      .pipe(delay(1000));
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/user/remove-user/${id}`).pipe(delay(1000));
  }

}
