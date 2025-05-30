import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFrameComponent } from "./page/main-frame/main-frame.component";
import { ListCoursesComponent } from "./components/list-courses/list-courses.component";
import { ViewProfileComponent } from "./components/view-profile/view-profile.component";

const routes: Routes = [
  {
    path: '',
    component: MainFrameComponent,
    children: [
      {
        path: 'list-courses',
        component: ListCoursesComponent,
      },
      {
        path: 'view-profile',
        component: ViewProfileComponent
      },
      {
        path: '**',
        redirectTo: 'list-courses'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatedraticRoutingModule {
}
