import {
  Component,
  inject,
  OnDestroy,
  signal,
  WritableSignal
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { ICatedratic } from "../../../../../../interface/ICatedratic.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TransformUsersOptionsService } from "../../service/execution/transform-users-options.service";
import { ISelect } from "../../../../../../interface/ISelect.interface";
import { CourseApiService } from "../../../../../../service/api/course-api.service";
import { finalize, Subscription } from "rxjs";
import { UtilService } from "../../../../../../service/execution/util.service";
import { MessageService } from "primeng/api";
import { ToastService } from "../../../../service/execution/toast.service";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
  providers: [MessageService]
})
export class UpdateCourseComponent implements OnDestroy {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  updateCourseForm: FormGroup = this._formBuilder.group({
    courseId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    catedraticId: ['', [Validators.required]]
  });

  course!: WritableSignal<ICourse>;
  catedratics!: WritableSignal<ICatedratic[]>;
  legend!: WritableSignal<string>;
  catedraticsOptions: WritableSignal<ISelect<number>[]> = signal<ISelect<number>[]>([]);
  timeout: any;

  private _subscription: Subscription[] = [];
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _transformUserOptionsService: TransformUsersOptionsService = inject(TransformUsersOptionsService);
  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _utilService: UtilService = inject(UtilService);
  private _router: Router = inject(Router);
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);

  constructor() {
    this.getCourse();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  hasError(input: string, errorName: string): boolean | undefined {
    return this.updateCourseForm.get(input)?.hasError(errorName) && this.updateCourseForm.get(input)?.touched;
  }

  updateHandler(): void {
    if (this.updateCourseForm.invalid) return;

    this._utilService.showSpinner();

    const subscription: Subscription = this._courseApiService.update(this.updateCourseForm.value)
      .pipe(
        finalize((): void => this._utilService.hideSpinner())
      )
      .subscribe({
        next: (): void => this.updateSuccess()
      });

    this._subscription.push(subscription);
  }

  private getCourse(): void {
    const data = this._activatedRoute.snapshot.data['updateData'];
    this.course = signal<ICourse>(data.course);
    this.catedratics = signal<ICatedratic[]>(data.catedratics);
    this.legend = signal<string>(`Actualizando el curso ${this.course().name}`);
    this.updateCourseForm.reset(this.course());
    this.catedraticsOptions.set(this._transformUserOptionsService.transformCatedraticOptions(this.catedratics()));
    this.updateCourseForm.get('courseId')?.setValue(this.course().courseId);
  }

  private updateSuccess(): void {
    this._toastService.showSuccessToast({
      messageService: this._messageService,
      summary: 'Curso actualizado exitosamente!',
      detail: `El curso ${this.course().name} fue actualizado exitosamente con el ID ${this.course().courseId}`
    });

    this.updateCourseForm.reset();
    this.updateCourseForm.disable();

    const countDown = setTimeout(() => {
      this._router.navigate(['/administrator/assignation/list']).then(() => {
      });
    }, 2000);

    this.timeout = countDown;
  }

  private unsubscribeAll(): void {
    this._subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
    clearTimeout(this.timeout);
  }


}
