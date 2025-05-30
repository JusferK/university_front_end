import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdministratorApiService } from "../../service/api/administrator-api.service";
import { ToastService } from "../../../../service/execution/toast.service";
import { MessageService } from "primeng/api";
import { UtilService } from "../../../../../../service/execution/util.service";
import { IAdministrator } from "../../../../../../interface/IAdministrator";
import { delay, finalize, Subscription } from "rxjs";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css',
  providers: [MessageService],
})
export class AddAdminComponent {

  private _formBuilder: FormBuilder = inject(FormBuilder);

  newAdminForm: FormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  private _subscription: Subscription[] = [];
  private _administratorApiService: AdministratorApiService = inject(AdministratorApiService);
  private _utilService: UtilService = inject(UtilService);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);

  hasError(input: string, errorName: string): boolean | undefined {
    return this.newAdminForm.get(input)?.hasError(errorName) && this.newAdminForm.get(input)?.touched;
  }

  addHandler(): void {

    if (this.newAdminForm.invalid) {
      this.newAdminForm.markAllAsTouched();
      return;
    }

    this._utilService.showSpinner();
    const subscription = this._administratorApiService.save(this.newAdminForm.value)
      .pipe(
        finalize((): void => this._utilService.hideSpinner())
      )
      .subscribe({
        next: (response: IAdministrator): void => this.successHandler(response),
      });

    this._subscription.push(subscription);
  }

  private successHandler(response: IAdministrator): void {
    this._utilService.showSpinner();

    this._toastService.showSuccessToast({
      messageService: this._messageService,
      summary: `Administrador agregado!`,
      detail: `El administrador ${response.username} fue creado exitosamente`,
    });

    this.newAdminForm.reset();
  }



}
