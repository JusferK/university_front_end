import {
  Component,
  inject, OnDestroy,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ISelect } from "../../../../../../interface/ISelect.interface";
import { IStudent } from "../../../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../../../interface/ICatedratic.interface";
import { TransformUsersOptionsService } from "../../service/execution/transform-users-options.service";
import { ActivatedRoute } from "@angular/router";
import { ITransformedUsers } from "../../interface/ITransformedUsers.interface";
import { DropdownChangeEvent } from "primeng/dropdown";
import { InputSwitch, InputSwitchChangeEvent } from "primeng/inputswitch";
import { Subscription } from "rxjs";
import { CourseApiService } from "../../service/api/course-api.service";
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { ToastService } from "../../../../service/execution/toast.service";
import { MessageService } from "primeng/api";
import { UtilService } from "../../../../../../service/execution/util.service";
import { IStudentCourse } from "../../../../../../interface/IStudentCourse.interface";
import { TransformToAssignationService } from "../../service/execution/transform-to-assignation.service";
import { HandleMassiveAssignationService } from "../../service/execution/handle-massive-assignation.service";


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  providers: [MessageService]
})
export class AddCourseComponent implements OnDestroy {

  @ViewChild('inputSwitch') inputSwitch!: InputSwitch;

  showAggregableStudents: WritableSignal<boolean> = signal<boolean>(false);
  studentOptions: WritableSignal<IStudent[]> = signal<IStudent[]>([]);
  catedraticOptions: WritableSignal<ISelect<ICatedratic>[]> = signal<ISelect<ICatedratic>[]>([]);
  selectedStudents: WritableSignal<IStudent[]> = signal<IStudent[]>([]);
  studentsWereSelected: WritableSignal<boolean> = signal<boolean>(false);

  private _formBuilder: FormBuilder = inject(FormBuilder);
  newCourseForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    catedraticId: ['', Validators.required]
  });

  courseNameHeader: WritableSignal<string> = signal('Asignados a este curso');

  private _subscription: Subscription[] = [];
  private _transformUserOptionsService: TransformUsersOptionsService = inject(TransformUsersOptionsService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);
  private _utilService: UtilService = inject(UtilService);
  private _transformToAssignationService: TransformToAssignationService = inject(TransformToAssignationService);
  private _handleMassiveAssignationService: HandleMassiveAssignationService = inject(HandleMassiveAssignationService);


  constructor() {
    this.initDefinition();
    this.courseNameChangesBehaviour();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  hasError(input: string, errorName: string): boolean | undefined {
    return this.newCourseForm.get(input)?.hasError(errorName) && this.newCourseForm.get(input)?.touched;
  }

  changeHandler({ value }: DropdownChangeEvent): void {
    const catedratic: ICatedratic = value.value;
    this.newCourseForm.get('catedraticId')?.setValue(catedratic.catedraticId);
  }

  onSwitchChange({ checked }: InputSwitchChangeEvent): void {
    this.showAggregableStudents.set(checked);
  }

  clickHandler(): void {
    this.studentsWereSelected.update((prev: boolean): boolean => !prev);
    if (this.selectedStudents().length === 0) {
      this.showAggregableStudents.set(false);
      this.inputSwitch.writeValue(false);
      this.studentsWereSelected.set(false);
    }
  }

  addHandler(): void {
    if (this.newCourseForm.invalid) {
      this.newCourseForm.markAllAsTouched();
      return;
    }
    this._utilService.showSpinner();

    const subscription: Subscription = this._courseApiService
      .save(this.newCourseForm.value)
      .subscribe({
        next: (response: ICourse): void => this.courseAddedHandler(response),
      })

    this._subscription.push(subscription);
  }

  private initDefinition(): void {
    const users = this._activatedRoute.snapshot.data['users'] as { students: IStudent[], catedratics: ICatedratic[] };

    const signals: ITransformedUsers = this._transformUserOptionsService.transformUsersOptions({ users });

    const { catedratics } = signals;

    this.catedraticOptions.set(catedratics());
    this.studentOptions.set(users.students);
  }

  private courseNameChangesBehaviour(): void {
    const subscription: Subscription | undefined = this.newCourseForm.get('name')?.valueChanges
      .subscribe(
        (value: string): void => value && value.trim() !== '' ? this.courseNameHeader.set(`Asignados a ${value}`) : this.courseNameHeader.set('Asignados a este curso')
      );

    subscription && this._subscription.push(subscription);
  }

  private courseAddedHandler(response: ICourse): void {

    const summary: string = 'Curso creado exitosamente!';
    const detail: string = `El curso ${response.name} fue creado exitosamente con el ID ${response.courseId}`;

    if (this.selectedStudents().length > 0) {
      const assignation: IStudentCourse[] = this._transformToAssignationService.transformMassiveToAssignation(this.selectedStudents(), response.courseId!);
      const subscription: Subscription = this._handleMassiveAssignationService.handleMassiveAssignation(assignation, (): void => this.methodHandler(detail, summary));
      this._subscription.push(subscription);
    } else {
      this._utilService.hideSpinner();
      this._utilService.hideSpinner();
      this.showSuccessToast(detail, summary);
      this.newCourseForm.reset();
      this.studentsWereSelected.set(false);
      this.showAggregableStudents.set(false);
      this.inputSwitch.writeValue(false);
      this.courseNameHeader.set('Asignados a este curso');
    }

  }

  private methodHandler(detail: string, summary: string): void {
    this.showSuccessToast(detail, summary);
    this.newCourseForm.reset();
    this.studentsWereSelected.set(false);
    this.showAggregableStudents.set(false);
    this.inputSwitch.writeValue(false);
    this.selectedStudents.set([]);
    this.courseNameHeader.set('Asignados a este curso');
    this._utilService.hideSpinner();
  }

  private showSuccessToast(detail: string, summary: string): void {
    this._toastService.showSuccessToast({
      messageService: this._messageService,
      detail,
      summary
    });
  }

  private unsubscribeAll(): void {
    this._subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
