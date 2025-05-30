import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatedraticRoutingModule } from './catedratic-routing.module';
import { MainFrameComponent } from './page/main-frame/main-frame.component';
import { ListCoursesComponent } from "./components/list-courses/list-courses.component";
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { PrimengModule } from "../primeng/primeng.module";


@NgModule({
  declarations: [
    MainFrameComponent,
    ListCoursesComponent,
    ViewProfileComponent,
  ],
  imports: [
    CommonModule,
    CatedraticRoutingModule,
    PrimengModule,
  ]
})
export class CatedraticModule {
}
