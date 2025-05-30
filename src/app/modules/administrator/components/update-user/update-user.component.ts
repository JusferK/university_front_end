import {
  Component,
  computed,
  inject,
  OnDestroy,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IStudent } from "../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import { ISearchUser } from "../../interface/ISearchUser.interface";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ISelect } from "../../../../interface/ISelect.interface";
import Degrees from "../../../../../assets/json/degrees.json";
import Genders from "../../../../../assets/json/gender-type.json";
import { DatePipe } from "@angular/common";
import { PasswordGeneratorService } from "../../../../service/execution/password-generator.service";
import { finalize, Subscription } from "rxjs";
import { CatedraticApiService } from "../../../../service/api/catedratic-api.service";
import { StudentApiService } from "../../../../service/api/student-api.service";
import { UtilService } from "../../../../service/execution/util.service";
import { ToastService } from "../../service/execution/toast.service";
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
  providers: [DatePipe, MessageService]
})
export class UpdateUserComponent implements OnDestroy {

  presentData: WritableSignal<boolean> = signal<boolean>(false);
  dataToPresent: WritableSignal<ICatedratic | IStudent | undefined> = signal<ICatedratic | IStudent | undefined>(undefined);
  userType: WritableSignal<string> = signal<string>('');
  student: WritableSignal<IStudent | undefined> = signal<IStudent | undefined>(undefined);
  catedratic: WritableSignal<ICatedratic | undefined> = signal<ICatedratic | undefined>(undefined);
  isStudent: Signal<boolean> = computed((): boolean => this.userType() === 'student');
  panelHeader: Signal<string> = computed((): string => {
    return this.isStudent() ? (
      `Actualizando al estudiante ${this.student()?.name} con el carnet ${this.student()?.studentId}`
    ) : (
      `Actualizando al catedratico ${this.catedratic()?.name} con el ID ${this.catedratic()?.catedraticId}`
    );
  });

  private _formBuilder: FormBuilder = inject(FormBuilder);
  updateForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    sex: ['', Validators.required],
    birthDate: [''],
    latestDegree: ['']
  });
  degrees: ISelect<string>[] = Degrees;
  genders: ISelect<string>[] = Genders;

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _datePipe: DatePipe = inject(DatePipe);
  private _randomPasswordGenerator: PasswordGeneratorService = inject(PasswordGeneratorService);
  private _studentApiService: StudentApiService = inject(StudentApiService);
  private _catedraticApiService: CatedraticApiService = inject(CatedraticApiService);
  private _subscriptions: Subscription[] = [];
  private _utilService: UtilService = inject(UtilService);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);

  constructor() {
    this.getUser();
    this.transformInputs();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  hasError(input: string, errorName: string): boolean | undefined {
    return this.updateForm.get(input)?.hasError(errorName) && this.updateForm.get(input)?.touched;
  }

  updateHandler(): void {
    this._utilService.showSpinner();
    this.setUnabledInputs();
    if (this.isStudent()) {
      const subscription: Subscription = this._studentApiService.updateStudent(this.prepareStudent() as IStudent)
        .pipe(finalize((): void => this._utilService.hideSpinner()))
        .subscribe({
          next: (value: IStudent): void => this.handleSuccess(value)
        });

      this._subscriptions.push(subscription);
      return;
    } else {
      const subscription: Subscription = this._catedraticApiService.updateCatedratic(this.prepareCatedratic() as ICatedratic)
        .pipe(finalize((): void => this._utilService.hideSpinner()))
        .subscribe({
          next: (value: ICatedratic): void => this.handleSuccess(value)
        });

      this._subscriptions.push(subscription);
    }

  }

  backHome(): void {
    this._router.navigate(['/administrator/']);
  }

  getPresentData(): IStudent | ICatedratic {
    return this.dataToPresent() as IStudent | ICatedratic;
  }

  onHideHandler(): void {
    this.dataToPresent.set(undefined);
    this.presentData.set(false);
    this.updateForm.reset();
    this.backHome();
  }

  private getUser(): void {
    const user: ISearchUser = this._route.snapshot.data['user'];
    this.userType.set(user.userType);

    if (user.userType === 'student') {
      this.student.set(user.student as IStudent);
      this.updateForm.reset(this.student());
      return;
    }

    this.catedratic.set(user.catedratic as ICatedratic);
    this.updateForm.reset(this.catedratic());
  }

  private transformInputs(): void {
    if (this.isStudent()) {
      this.updateForm.get('birthDate')?.setValue(
        this._datePipe.transform(this.updateForm.get('birthDate')?.value)
      );
      this.updateForm.get('birthDate')?.disable();
    }
    this.updateForm.get('sex')?.disable();
    this.updateForm.get('password')?.patchValue(
      this._randomPasswordGenerator.generateRandomPassword()
    );
  }

  private setUnabledInputs(): void {
    if (this.isStudent()) {
      this.updateForm.get('birthDate')?.enable();
      this.updateForm.get('birthDate')?.patchValue(this.student()?.birthDate);
    }

    this.updateForm.get('sex')?.enable();
  }

  private prepareStudent(): IStudent {
    const { latestDegree, ...student } = this.updateForm.value;

    return {
      studentId: this.student()?.studentId,
      ...student
    }
  }

  private prepareCatedratic(): ICatedratic {
    const { birthDate, ...catedratic } = this.updateForm.value;
    return {
      catedraticId: this.catedratic()?.catedraticId,
      ...catedratic
    };
  }

  private handleSuccess(user: IStudent | ICatedratic): void {
    this.showSuccessToast(user);
    this.presentDataHandler(user);
  }

  private showSuccessToast(user: IStudent | ICatedratic): void {
    let summary: string = '';
    let detail: string = '';

    if (this.isStudent()) {
      const student: IStudent = user as IStudent;
      summary = 'Estudiante actualizado!';
      detail = `Estudiante fue actualizado con el carnet ${student.studentId} exitosamente.`;
    } else {
      const catedratic: ICatedratic = user as ICatedratic;
      summary = 'Catedratico actualizado!';
      detail = `Catedratico fue actualizado con el ID ${catedratic.catedraticId} exitosamente.`;
    }

    this._toastService.showSuccessToast({
      summary,
      detail,
      messageService: this._messageService,
    });
  }

  private presentDataHandler(data: IStudent | ICatedratic): void {
    this.dataToPresent.set(data);
    this.presentData.set(true);
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription): void => subscription.unsubscribe());
  }

}
