import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { MainComponent } from './page/main/main.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AssignationComponent } from './components/assignation/assignation.component';
import { PrimengModule } from "../primeng/primeng.module";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PresentDataComponent } from './components/present-data/present-data.component';
import { DegreePipe } from '../../pipe/degree.pipe';
import { UserListComponent } from './components/user-list/user-list.component';
import { GetDataListResolver } from "./resolver/get-data-list.resolver";
import { SearchUserResolver } from "./resolver/search-user.resolver";
import { GenderPipe } from "../../pipe/gender.pipe";


@NgModule({
  declarations: [
    MainComponent,
    AddUserComponent,
    UpdateUserComponent,
    AssignationComponent,
    PresentDataComponent,
    DegreePipe,
    UserListComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  exports: [
    GenderPipe,
    DegreePipe
  ],
  providers: [
    GetDataListResolver,
    SearchUserResolver
  ]
})
export class AdministratorModule {
}
