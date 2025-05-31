import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { MainFrameStudentComponent } from './page/main-frame-student/main-frame-student.component';
import { ListCoursesAssignedComponent } from './components/list-courses-assigned/list-courses-assigned.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AvatarModule } from "primeng/avatar";
import { Button } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PrimeTemplate } from "primeng/api";
import { AdministratorModule } from '../administrator/administrator.module';
import { FieldsetModule } from 'primeng/fieldset';
import { GetCoursesDataResolver } from './resolver/get-courses-data.resolver';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    MainFrameStudentComponent,
    ListCoursesAssignedComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AvatarModule,
    Button,
    MenubarModule,
    OverlayPanelModule,
    PrimeTemplate,
    AdministratorModule,
    FieldsetModule,
    TableModule,
    ToastModule
  ],
  providers: [GetCoursesDataResolver]
})
export class StudentModule {
}
