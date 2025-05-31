import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourseWithStudents } from '../../../../interface/ICourse.interface';
import { ProfileService } from '../../../../service/execution/profile.service';
import { IStudent } from '../../../../interface/IStudent.interface';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
  selector: 'app-list-courses-assigned',
  templateUrl: './list-courses-assigned.component.html',
  styleUrl: './list-courses-assigned.component.css'
})
export class ListCoursesAssignedComponent {

  expandedRows: WritableSignal<{ [key: string]: boolean }> = signal<{ [key: string]: boolean }>({});

  studentCourses: WritableSignal<ICourseWithStudents[]> = signal<ICourseWithStudents[]>([]);
  coursesAssignedLegend: WritableSignal<string> = signal<string>('');
  studentProfile!: WritableSignal<IStudent>;

  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _profileService: ProfileService = inject(ProfileService);

  constructor() {
    this.loadStudentCourses();
  }

  onRowExpand(event: TableRowExpandEvent): void {
    this.expandedRows.update(prev => {
      prev[event.data.studentId] = true;
      return prev;
    });

  }

  onRowCollapse(event: TableRowCollapseEvent): void {
    this.expandedRows.update(prev => {
      delete prev[event.data.studentId];
      return prev;
    });

  }

  private loadStudentCourses(): void {
    this.studentCourses.set(this._activatedRoute.snapshot.data['coursesAssigned'] as ICourseWithStudents[]);
    this.studentProfile = signal<IStudent>(this._profileService.getSavedUser() as IStudent);
    this.coursesAssignedLegend.set(`Hola ${this.studentProfile().name} ${this.studentProfile().lastName}, estas asignado a estos cursos.`);
  }

}
