import { Injectable } from '@angular/core';
import {IConfirmationArguments} from "../../interface/IConfirmationArguments.interface";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationPopUpService {

  confirm({ confirmationService, event, acceptHandler, rejectHandler }: IConfirmationArguments): void {
    confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas seguro de la informacion?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: acceptHandler,
      reject: rejectHandler,
    });
  }

}
