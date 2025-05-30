import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from "./page/main-frame/main-frame.component";
import { ListComponent } from "./components/list/list.component";
import { AddCourseComponent } from "./components/add-course/add-course.component";
import { AssignCourseComponent } from "./components/assign-course/assign-course.component";
import { GetCoursesResolver } from "./resolver/get-courses.resolver";
import { GetDataListResolver } from "../../resolver/get-data-list.resolver";
import { UpdateCourseComponent } from "./components/update-course/update-course.component";
import { GetCourseResolver } from "./resolver/get-course.resolver";
import { CoursesAndStudentsResolver } from "./resolver/courses-and-students.resolver";

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
        path: 'update-course/:id',
        component: UpdateCourseComponent,
        resolve: {
          updateData: GetCourseResolver
        }
      },
      {
        path: 'assignation',
        component: AssignCourseComponent,
        resolve: {
          entities: CoursesAndStudentsResolver
        }
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
    GetCourseResolver,
    CoursesAndStudentsResolver,
  ]
})
export class AssignationRoutingModule {
}
