import {
  Component,
  inject,
  OnInit, signal, WritableSignal
} from '@angular/core';
import { ActivatedRoute, Data } from "@angular/router";
import UserType from '../../../../../assets/json/user-type.json';
import { MenuItem } from "primeng/api";
import { IListUser } from "../../interface/IListUser.interface";
import { DropdownChangeEvent } from "primeng/dropdown";
import { IStudent } from "../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../interface/ICatedratic.interface";
import userTypeOptions from "../../../../../assets/json/user-type.json";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  private _route: ActivatedRoute = inject(ActivatedRoute);
  students: WritableSignal<IStudent[]> = signal<IStudent[]>([]);
  catedratics: WritableSignal<ICatedratic[]> = signal<ICatedratic[]>([]);

  userTypeOptions: MenuItem[] = UserType;
  showType: WritableSignal<'STUDENT' | 'CATEDRATIC'> = signal<'STUDENT' | 'CATEDRATIC'>('STUDENT');

  ngOnInit() {
    this.initUsers();
  }

  handleChangeType(event: DropdownChangeEvent): void {
    event.value === 'STUDENT' ? this.showType.set('STUDENT') : this.showType.set('CATEDRATIC');
  }

  private initUsers(): void {
    const data = this._route.snapshot.data['users'];
    this.students.set(data.students as IStudent[]);
    this.catedratics.set(data.catedratics as ICatedratic[]);
    console.log(data);
  }

}
