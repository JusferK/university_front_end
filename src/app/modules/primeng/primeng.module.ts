import { NgModule } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    MenubarModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    TableModule
  ],
  exports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    MenubarModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    TableModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimengModule {
}
