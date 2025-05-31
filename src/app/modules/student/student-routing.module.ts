import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameStudentComponent } from "./page/main-frame-student/main-frame-student.component";

import { ViewProfileComponent } from "./components/view-profile/view-profile.component";
import { ListCoursesAssignedComponent } from './components/list-courses-assigned/list-courses-assigned.component';
import { GetCoursesDataResolver } from './resolver/get-courses-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainFrameStudentComponent,
    children: [
      {
        path: 'courses-assigned',
        component: ListCoursesAssignedComponent,
        resolve: {
          coursesAssigned: GetCoursesDataResolver
        }
      },
      {
        path: 'profile',
        component: ViewProfileComponent
      },
      {
        path: '**',
        redirectTo: 'courses-assigned'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
