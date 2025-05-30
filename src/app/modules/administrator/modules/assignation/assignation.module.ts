import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignationRoutingModule } from './assignation-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { MainFrameComponent } from './page/main-frame/main-frame.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { PrimengModule } from "../../../primeng/primeng.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Dir } from "@angular/cdk/bidi";
import { AdministratorModule } from "../../administrator.module";
import { NoDataRowOutlet } from "@angular/cdk/table";


@NgModule({
  declarations: [
    ListComponent,
    AddCourseComponent,
    AssignCourseComponent,
    MainFrameComponent,
    UpdateCourseComponent,
  ],
  imports: [
    CommonModule,
    AssignationRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    DragDropModule,
    Dir,
    AdministratorModule,
    NoDataRowOutlet,
  ]
})
export class AssignationModule {
}
