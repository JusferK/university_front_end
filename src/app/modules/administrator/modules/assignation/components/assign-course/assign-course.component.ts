import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnDestroy,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ISelect } from "../../../../../../interface/ISelect.interface";
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { TransformUsersOptionsService } from "../../service/execution/transform-users-options.service";
import { IStudent } from "../../../../../../interface/IStudent.interface";
import { Dropdown, DropdownChangeEvent } from "primeng/dropdown";
import {
  FilterUnassignedAndAssignedStudentsService
} from "../../service/execution/filter-unassigned-and-assigned-students.service";
import {
  HandleMassiveAssignationTransactionService
} from "../../service/execution/handle-massive-assignation-transaction.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { ToastService } from "../../../../service/execution/toast.service";

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrl: './assign-course.component.css',
  providers: [MessageService]
})
export class AssignCourseComponent implements AfterViewInit, OnDestroy {

  @ViewChild('dropdown') dropdown!: Dropdown;

  enableAssignationBox: WritableSignal<boolean> = signal<boolean>(false);

  coursesOptions: WritableSignal<ISelect<number>[]> = signal<ISelect<number>[]>([]);

  centralizedCourses: WritableSignal<ICourse[]> = signal<ICourse[]>([]);
  centralizedStudents: WritableSignal<IStudent[]> = signal<IStudent[]>([]);

  studentsAssigned: WritableSignal<IStudent[]> = signal<IStudent[]>([]);
  studentsUnassigned: WritableSignal<IStudent[]> = signal<IStudent[]>([]);

  courseSelected: WritableSignal<number> = signal<number>(0);
  courseNameSelected: Signal<string> = computed(() => {
    const course: ICourse = this.centralizedCourses().find((course: ICourse) => course.courseId === this.courseSelected())!;
    return course.name;
  });

  timeout: any;

  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _transformUsersOptionsService: TransformUsersOptionsService = inject(TransformUsersOptionsService);
  private _filerUnassignedAndAssignedStudentsService: FilterUnassignedAndAssignedStudentsService = inject(FilterUnassignedAndAssignedStudentsService);
  private _handleMassiveAssignationTransactionService: HandleMassiveAssignationTransactionService = inject(HandleMassiveAssignationTransactionService);
  private _messageService: MessageService = inject(MessageService);
  private _toastService: ToastService = inject(ToastService);
  private _router: Router = inject(Router);
  private _subscriptions: Subscription[] = [];

  constructor() {
    this.initDefinition();
  }

  ngAfterViewInit(): void {
    this.initializeValue();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  dropdownChangeHandler({ value }: DropdownChangeEvent): void {
    this.setSelectedCourse(value);

    const findCourse: ICourse = this.centralizedCourses().find((course: ICourse): boolean => course.courseId === value)!;
    this.defineAssignations(findCourse, this.centralizedStudents());
  }

  assignHandler(): void {

    const course: ICourse | undefined = this.centralizedCourses().find((course: ICourse): boolean => course.courseId === this.courseSelected());
    if (!course) return;

    const subcription: Subscription | undefined = this._handleMassiveAssignationTransactionService
      .handler({
        course,
        studentsAssigned: this.studentsAssigned(),
        studentsUnassigned: this.studentsUnassigned(),
        methodHandler: (): void => this.successHandler()
      });

    if (subcription) this._subscriptions.push(subcription);
  }

  private initDefinition(): void {
    const data = this._activatedRoute.snapshot.data['entities'];
    this.coursesOptions.set(this._transformUsersOptionsService.transformCoursesOptions(data.courses));
    this.centralizedCourses.set(data.courses);
    this.centralizedStudents.set(data.students);

    const courseArgument: ICourse = data.courses[0];

    this.courseSelected.set(courseArgument.courseId!);
    this.defineAssignations(courseArgument, this.centralizedStudents());
  }

  private initializeValue(): void {
    this.dropdown.writeValue(this.courseSelected());
  }

  private setSelectedCourse(value: number): void {
    this.courseSelected.set(value);
  }

  private defineAssignations(course: ICourse, students: IStudent[]): void {
    const {
      unassignedStudents,
      assignedStudents
    } = this._filerUnassignedAndAssignedStudentsService.filter(course, students);

    this.studentsUnassigned.set(unassignedStudents);
    this.studentsAssigned.set(assignedStudents);
  }

  private successHandler(): void {

    this.enableAssignationBox.set(true);

    this._toastService.showSuccessToast({
      messageService: this._messageService,
      detail: `Transaccion completada con exito!`,
      summary: `Asignacion exitosa!`
    });

    this.timeout = setTimeout((): void => {
      this._router.navigate(['/administrator/assignation/list']).then(() => {
      });
    }, 3000);
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription): void => subscription.unsubscribe());
    clearTimeout(this.timeout);
  }

}
