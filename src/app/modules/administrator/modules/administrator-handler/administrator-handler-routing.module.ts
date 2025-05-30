import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminMainFrameComponent} from "./page/admin-main-frame/admin-main-frame.component";
import {ListAdminComponent} from "./components/list-admin/list-admin.component";
import {AddAdminComponent} from "./components/add-admin/add-admin.component";
import { GetAdministratorsResolver } from "./resolver/get-administrators.resolver";

const routes: Routes = [
  {
    path: '',
    component: AdminMainFrameComponent,
    children: [
      {
        path: 'list',
        component: ListAdminComponent,
        resolve: {
          administrators: GetAdministratorsResolver
        }
      },
      {
        path: 'add-admin',
        component: AddAdminComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorHandlerRoutingModule { }
