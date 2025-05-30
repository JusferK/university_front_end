import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./page/main/main.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { AssignationComponent } from "./components/assignation/assignation.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { GetDataListResolver } from "./resolver/get-data-list.resolver";
import { SearchUserResolver } from "./resolver/search-user.resolver";

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
        path: 'update-user/:userType/:id',
        component: UpdateUserComponent,
        resolve: {
          user: SearchUserResolver
        }
      },
      {
        path: 'assignation',
        component: AssignationComponent,
        loadChildren: () => import('./modules/assignation/assignation.module').then(m => m.AssignationModule)
      },
      {
        path: 'administrator-handler',
        loadChildren: () => import('./modules/administrator-handler/administrator-handler.module').then(m => m.AdministratorHandlerModule)
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
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
