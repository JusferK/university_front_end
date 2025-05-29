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
import { MenuModule } from 'primeng/menu';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PickListModule } from 'primeng/picklist';

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
    TableModule,
    MenuModule,
    FieldsetModule,
    InputTextareaModule,
    InputSwitchModule,
    PickListModule,
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
    TableModule,
    MenuModule,
    FieldsetModule,
    InputTextareaModule,
    InputSwitchModule,
    PickListModule,
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimengModule {
}
