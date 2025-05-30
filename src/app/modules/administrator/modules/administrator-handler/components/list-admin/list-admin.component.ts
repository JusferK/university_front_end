import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IAdministrator } from "../../../../../../interface/IAdministrator";
import { ActivatedRoute, Router } from "@angular/router";
import { AdministratorApiService } from "../../service/api/administrator-api.service";
import { ToastService } from "../../../../service/execution/toast.service";
import { MessageService } from "primeng/api";
import { UtilService } from "../../../../../../service/execution/util.service";
import { finalize } from "rxjs";

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css',
  providers: [MessageService]
})
export class ListAdminComponent {

  administratorsList: WritableSignal<IAdministrator[]> = signal<IAdministrator[]>([]);

  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _administratorApiService: AdministratorApiService = inject(AdministratorApiService);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);
  private _utilService: UtilService = inject(UtilService);


  constructor() {
    this.loadData();
  }

  directToUpdate(administrator: IAdministrator): void {
    this._router.navigate(['administrator/administrator-handler/update-admin', administrator.username]);
  }

  removeHandler(administrator: IAdministrator): void {
    this._utilService.showSpinner();

    this._administratorApiService.delete(administrator.id)
      .pipe(finalize((): void => this._utilService.hideSpinner()))
      .subscribe({
        next: () => this.removeSuccessHandler(administrator)
      })
  }

  private loadData(): void {
    this.administratorsList.set(this._activatedRoute.snapshot.data['administrators']);
  }

  private removeSuccessHandler(adminRemoved: IAdministrator): void {
    this._toastService.showSuccessToast({
      detail: `El administrador ${adminRemoved.username} ha sido removido.`,
      summary: 'El administrador fue removido exitosamenete!',
      messageService: this._messageService
    });

    this.administratorsList.update((prev: IAdministrator[]): IAdministrator[] => {
      return prev.filter((admin: IAdministrator) => admin.id !== adminRemoved.id);
    })
  }

}
