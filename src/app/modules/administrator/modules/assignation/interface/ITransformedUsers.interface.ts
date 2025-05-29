import { WritableSignal } from "@angular/core";
import { IStudent } from "../../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../../interface/ICatedratic.interface";
import { ISelect } from "../../../../../interface/ISelect.interface";

export interface ITransformedUsers {
  students: WritableSignal<ISelect<IStudent>[]>;
  catedratics: WritableSignal<ISelect<ICatedratic>[]>;
}
