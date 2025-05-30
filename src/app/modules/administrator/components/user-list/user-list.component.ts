import {
  Component, computed,
  inject, OnDestroy,
  OnInit, Signal, signal, WritableSignal
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import UserType from '../../../../../assets/json/user-type.json';
import { MenuItem, MessageService } from "primeng/api";
import { DropdownChangeEvent } from "primeng/dropdown";
import { IStudent } from "../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import { StudentApiService } from "../../../../service/api/student-api.service";
import { CatedraticApiService } from "../../../../service/api/catedratic-api.service";
import { UtilService } from "../../../../service/execution/util.service";
import { ToastService } from "../../service/execution/toast.service";
import { finalize, Subscription } from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService]
})
export class UserListComponent implements OnInit, OnDestroy {

  private _route: ActivatedRoute = inject(ActivatedRoute);
  students: WritableSignal<IStudent[]> = signal<IStudent[]>([]);
  catedratics: WritableSignal<ICatedratic[]> = signal<ICatedratic[]>([]);

  userTypeOptions: MenuItem[] = UserType;
  showType: WritableSignal<'STUDENT' | 'CATEDRATIC'> = signal<'STUDENT' | 'CATEDRATIC'>('STUDENT');
  isStudent: Signal<boolean> = computed((): boolean => this.showType() === 'STUDENT');

  private _utilService: UtilService = inject(UtilService);
  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);
  private _subscriptions: Subscription[] = [];
  private _router: Router = inject(Router);

  ngOnInit() {
    this.initUsers();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  handleChangeType(event: DropdownChangeEvent): void {
    event.value === 'STUDENT' ? this.showType.set('STUDENT') : this.showType.set('CATEDRATIC');
  }

  removeHandler(user: IStudent | ICatedratic): void {
    let subscription: Subscription;
    this._utilService.showSpinner();
    if (this.isStudent()) {
      user = user as IStudent;
      subscription = this._studentApiService.removeStudent(user.studentId!)
        .pipe(finalize((): void => this._utilService.hideSpinner()))
        .subscribe({
          next: () => this.removeFromView(user)
        });
    } else {
      user = user as ICatedratic;
      subscription = this._catedraticApiService.removeCatedratic(user.catedraticId!)
        .pipe(finalize((): void => this._utilService.hideSpinner()))
        .subscribe({
          next: () => this.removeFromView(user)
        });
    }

    this._subscriptions.push(subscription);
  }

  directToUpdate(user: IStudent | ICatedratic): void {
    if (this.isStudent()) {
      user = user as IStudent;
      this._router.navigate(['/administrator/update-user', 'student', user.studentId]).then(() => {
      });
    } else {
      user = user as ICatedratic;
      this._router.navigate(['/administrator/update-user', 'catedratic', user.catedraticId]).then(() => {
      });
    }
  }

  private initUsers(): void {
    const data = this._route.snapshot.data['users'];
    this.students.set(data.students);
    this.catedratics.set(data.catedratics);
  }

  private removeFromView(user: IStudent | ICatedratic): void {

    let student: IStudent;
    let catedratic: ICatedratic;

    if (this.isStudent()) {
      student = user as IStudent;
      this.students.update((prev: IStudent[]): IStudent[] => prev.filter((iteration: IStudent): boolean => iteration.studentId !== student.studentId));
    } else {
      catedratic = user as ICatedratic;
      this.catedratics.update((prev: ICatedratic[]): ICatedratic[] => prev.filter((iteration: ICatedratic): boolean => iteration.catedraticId !== catedratic.catedraticId));
    }

    this.showSuccessToast(user);
  }

  private showSuccessToast(user: IStudent | ICatedratic): void {
    let summary: string = '';
    let detail: string = '';

    if (this.isStudent()) {
      const student: IStudent = user as IStudent;
      summary = 'Estudiante removido!';
      detail = `Estudiante fue removido con el carnet ${student.studentId} exitosamente.`;
    } else {
      const catedratic: ICatedratic = user as ICatedratic;
      summary = 'Catedratico removido!';
      detail = `Catedratico fue removido con el ID ${catedratic.catedraticId} exitosamente.`;
    }

    this._toastService.showSuccessToast({
      summary,
      detail,
      messageService: this._messageService,
    });
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
