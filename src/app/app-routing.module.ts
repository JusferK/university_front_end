import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./view/login/login.component";
import { loginGuard} from "./guards/login.guard";
import { ESessionType } from "./enum/ESessionType.enum";
import { sessionGuard } from "./guards/session.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: ESessionType.ADMINISTRATOR,
    loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule),
    canActivate: [sessionGuard]
  },
  {
    path: ESessionType.CATEDRATIC,
    loadChildren: () => import('./modules/catedratic/catedratic.module').then(m => m.CatedraticModule),
    canActivate: [sessionGuard]
  },
  {
    path: ESessionType.STUDENT,
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [sessionGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
