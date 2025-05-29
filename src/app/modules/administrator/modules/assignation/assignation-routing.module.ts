import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from "./page/main-frame/main-frame.component";
import { ListComponent } from "./components/list/list.component";
import { AddCourseComponent } from "./components/add-course/add-course.component";
import { AssignCourseComponent } from "./components/assign-course/assign-course.component";
import { GetCoursesResolver } from "./resolver/get-courses.resolver";
import { GetDataListResolver } from "../../resolver/get-data-list.resolver";

const routes: Routes = [
  {
    path: '',
    component: MainFrameComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
        resolve: {
          courses: GetCoursesResolver
        }
      },
      {
        path: 'add-course',
        component: AddCourseComponent,
        resolve: {
          users: GetDataListResolver
        }
      },
      {
        path: 'assignation',
        component: AssignCourseComponent,
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
  exports: [RouterModule],
  providers: [
    GetCoursesResolver,
    GetDataListResolver,
  ]
})
export class AssignationRoutingModule {
}
