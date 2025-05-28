import { Injectable } from '@angular/core';
import { IToastArguments } from "../../interface/IToastArguments.interface";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  showSuccessToast({ messageService, detail, summary }: IToastArguments): void {
    messageService.add({ severity: 'success', summary, detail });
  }

}
