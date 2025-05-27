import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./page/main/main.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { RemoveUserComponent } from "./components/remove-user/remove-user.component";
import { AssignationComponent } from "./components/assignation/assignation.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {GetDataListResolver} from "./resolver/get-data-list.resolver";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'update-user',
        component: UpdateUserComponent
      },
      {
        path: 'remove-user',
        component: RemoveUserComponent
      },
      {
        path: 'assignation',
        component: AssignationComponent
      },
      {
        path: 'list',
        component: UserListComponent,
        resolve: {
          users: GetDataListResolver
        },

      },
      {
        path: '',
        redirectTo: 'add-user',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
