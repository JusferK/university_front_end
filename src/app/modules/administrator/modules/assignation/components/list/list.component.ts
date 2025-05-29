import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ICourse } from "../../../../../../interface/ICourse.interface";
import { TableRowCollapseEvent, TableRowExpandEvent } from "primeng/table";
import { CourseApiService } from "../../service/api/course-api.service";
import { UtilService } from "../../../../../../service/execution/util.service";
import { finalize, Subscription } from "rxjs";
import { ToastService } from "../../../../service/execution/toast.service";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [MessageService]
})
export class ListComponent implements OnDestroy {

  expandedRows: { [key: string]: boolean } = {};
  courses: WritableSignal<ICourse[]> = signal<ICourse[]>([]);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _courseApiService: CourseApiService = inject(CourseApiService);
  private _utilService: UtilService = inject(UtilService);
  private _subscription: Subscription[] = [];
  private _toastService: ToastService = inject(ToastService);
  private _messageService: MessageService = inject(MessageService);

  constructor() {
    this.getData();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  onRowExpand(event: TableRowExpandEvent): void {
    this.expandedRows[event.data.studentId] = true;
  }

  onRowCollapse(event: TableRowCollapseEvent): void {
    delete this.expandedRows[event.data.studentId];
  }

  removeHandler(course: ICourse): void {
    this._utilService.showSpinner();

    const subscription: Subscription = this._courseApiService.delete(course.courseId!)
      .pipe(
        finalize(() => this._utilService.hideSpinner())
      )
      .subscribe({
        next: (): void => this.handlerRemove(course)
      });

    this._subscription.push(subscription);
  }

  private handlerRemove(course: ICourse): void {
    this.courses.update((prev: ICourse[]): ICourse[] => prev.filter((iteration: ICourse): boolean => iteration.courseId !== course.courseId));

    const detail: string = `El curso ${course.name} fue eliminado exitosamente con el ID ${course.courseId}`;
    const summary: string = 'Curso eliminado exitosamente!';

    this._toastService.showSuccessToast({
      messageService: this._messageService,
      summary,
      detail
    });
  }

  private getData(): void {
    this.courses.set(this._activatedRoute.snapshot.data['courses']);
  }

  private unsubscribeAll(): void {
    this._subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
