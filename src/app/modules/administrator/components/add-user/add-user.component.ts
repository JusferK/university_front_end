import {
  Component,
  inject,
  OnDestroy,
  signal,
  WritableSignal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ISelect } from "../../../../interface/ISelect.interface";
import UserType from '../../../../../assets/json/user-type.json';
import Genders from '../../../../../assets/json/gender-type.json';
import Degrees from '../../../../../assets/json/degrees.json';
import { DropdownChangeEvent } from "primeng/dropdown";
import { EUserType } from "../../enums/EUserType.enum";
import { IStudent } from "../../../../interface/IStudent.interface";
import { ConfirmationPopUpService } from "../../service/execution/confirmation-pop-up.service";
import { ConfirmationService } from "primeng/api";
import { IConfirmationArguments } from "../../interface/IConfirmationArguments.interface";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import { UtilService } from "../../../../service/execution/util.service";
import { StudentApiService } from "../../../../service/api/student-api.service";
import { CatedraticApiService } from "../../../../service/api/catedratic-api.service";
import { finalize, Subscription } from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnDestroy {

  private _confirmationPopupService: ConfirmationPopUpService = inject(ConfirmationPopUpService);
  private _confirmationService: ConfirmationService = inject(ConfirmationService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _utilService: UtilService = inject(UtilService);
  private _studentService: StudentApiService = inject(StudentApiService);
  private _catedraticService: CatedraticApiService = inject(CatedraticApiService);
  private _subscriptions: Subscription[] = [];
  isStudent: WritableSignal<boolean> = signal<boolean>(true);
  presentData: WritableSignal<boolean> = signal<boolean>(false);
  dataToPresent: WritableSignal<ICatedratic | IStudent | undefined> = signal<ICatedratic | IStudent | undefined>(undefined);
  userType: ISelect<string>[] = UserType;
  genders: ISelect<string>[] = Genders;
  degrees: ISelect<string>[] = Degrees;

  newUserForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    sex: ['', Validators.required],
    birthDate: [''],
    latestDegree: ['']
  });

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  getPresentData(): IStudent | ICatedratic {
    return this.dataToPresent() as IStudent | ICatedratic;
  }

  userTypeChange(event: DropdownChangeEvent): void {
    const value: EUserType = event.value as EUserType;
    value.toLowerCase() === EUserType.CATEDRATIC.toLowerCase() ?
      this.isStudent.set(false) :
      this.isStudent.set(true);
  }

  addHandler(event: Event): void {
    if (!this.newUserForm.valid) {
      this.markAllMissing();
      return;
    }

    if (this.isStudent()) {
      if (!this.isDateBirthValid()) return;
      const { latestDegree, ...student } = this.newUserForm.value;
      const body: IStudent = student;
      this.confirm(event, body);
    } else {
      if (!this.isDegreeValid()) return;
      const { birthDate, ...catedratic } = this.newUserForm.value;
      const body: ICatedratic = catedratic;
      this.confirm(event, body);
    }
  }

  hasError(input: string, errorName: string): boolean | undefined {
    return this.newUserForm.get(input)?.hasError(errorName) && this.newUserForm.get(input)?.touched;
  }

  private isDateBirthValid(): boolean {
    const value: string = this.newUserForm.get('birthDate')?.value as string;
    if (value) return true;
    return value.trim() !== '';
  }

  private isDegreeValid(): boolean {
    const value: string = this.newUserForm.get('latestDegree')?.value as string;
    if (value) return true;
    return value.trim() !== '';
  }

  private confirm(event: Event, body: IStudent | ICatedratic): void {
    const confirmationArguments: IConfirmationArguments = {
      confirmationService: this._confirmationService,
      event,
      acceptHandler: (): void => this.addUser(body)
    };
    this._confirmationPopupService.confirm(confirmationArguments);
  }

  private addUser(body: IStudent | ICatedratic): void {

    this._utilService.showSpinner();
    let subscription: Subscription;
    this.dataToPresent.set(undefined);

    if (this.isStudent()) {
      subscription = this._studentService
        .addStudent(body as IStudent)
        .pipe(
          finalize((): void => this._utilService.hideSpinner())
        )
        .subscribe({
          next: (response: IStudent): void => this.presentDataHandler(response),
        });
    } else {
      subscription = this._catedraticService
        .addCatedratic(body as ICatedratic)
        .pipe(
          finalize((): void => this._utilService.hideSpinner())
        )
        .subscribe({
          next: (response: ICatedratic): void => this.presentDataHandler(response),
        });
    }

    this._subscriptions.push(subscription);
    this.newUserForm.reset();
  }

  private markAllMissing(): void {
    this.newUserForm.markAllAsTouched();
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private presentDataHandler(data: IStudent | ICatedratic): void {
    this.dataToPresent.set(data);
    this.presentData.set(true);
  }

}
