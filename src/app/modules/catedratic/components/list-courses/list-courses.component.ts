import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TableRowCollapseEvent, TableRowExpandEvent } from "primeng/table";
import { ICourseWithStudents } from "../../../../interface/ICourse.interface";
import { ProfileService } from "../../../../service/execution/profile.service";
import { ActivatedRoute } from "@angular/router";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent {

  courses: WritableSignal<ICourseWithStudents[]> = signal<ICourseWithStudents[]>([]);
  courseLegend: WritableSignal<string> = signal<string>('');

  expandedRows: { [key: string]: boolean } = {};

  private _profileService: ProfileService = inject(ProfileService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.loadCatedraticData();
  }

  onRowExpand(event: TableRowExpandEvent): void {
    this.expandedRows[event.data.studentId] = true;
  }

  onRowCollapse(event: TableRowCollapseEvent): void {
    delete this.expandedRows[event.data.studentId];
  }

  private loadCatedraticData(): void {
    this.courses.set(this._activatedRoute.snapshot.data['catedraticData']);
    const catedratic = this._profileService.getSavedUser() as ICatedratic;
    this.courseLegend.set(`Cursos impartidos por ti, ${catedratic.name}`);
  }

}
