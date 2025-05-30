import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICatedratic } from "../../interface/ICatedratic.interface";
import { delay, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatedraticApiService {

  private _httpClient: HttpClient = inject(HttpClient);

  addCatedratic(body: ICatedratic): Observable<ICatedratic> {
    return this._httpClient.post<ICatedratic>('/catedratic/new-catedratic', body)
      .pipe(
        delay(2000)
      );
  }

  getCatedratics(): Observable<ICatedratic[]> {
    return this._httpClient.get<ICatedratic[]>('/catedratic/get-all');
  }

  getCatedratic(id: string): Observable<ICatedratic> {
    return this._httpClient.get<ICatedratic>(`/catedratic/find-catedratic-by-id/${id}`);
  }

  updateCatedratic(catedratic: ICatedratic): Observable<ICatedratic> {
    return this._httpClient.put<ICatedratic>('/catedratic/update-catedratic', catedratic)
      .pipe(
        delay(2000)
      );
  }

  removeCatedratic(id: number): Observable<any> {
    return this._httpClient.delete<any>(`/catedratic/remove-catedratic/${id}`)
      .pipe(
        delay(2000)
      );
  }

}
