import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorHandlerRoutingModule } from './administrator-handler-routing.module';
import { AdminMainFrameComponent } from './page/admin-main-frame/admin-main-frame.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { ListAdminComponent } from './components/list-admin/list-admin.component';
import { MenuModule } from "primeng/menu";
import { PrimeTemplate } from "primeng/api";
import { GetAdministratorsResolver } from "./resolver/get-administrators.resolver";
import { AdministratorModule } from "../../administrator.module";
import { Button } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { FieldsetModule } from "primeng/fieldset";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { PickListModule } from "primeng/picklist";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { PasswordModule } from "primeng/password";


@NgModule({
  declarations: [
    AdminMainFrameComponent,
    AddAdminComponent,
    ListAdminComponent,
  ],
  imports: [
    CommonModule,
    AdministratorHandlerRoutingModule,
    MenuModule,
    PrimeTemplate,
    AdministratorModule,
    Button,
    DropdownModule,
    PanelModule,
    TableModule,
    ToastModule,
    FieldsetModule,
    InputSwitchModule,
    InputTextModule,
    PaginatorModule,
    PickListModule,
    ReactiveFormsModule,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule
  ],
  providers: [
    GetAdministratorsResolver,
  ]
})
export class AdministratorHandlerModule { }
