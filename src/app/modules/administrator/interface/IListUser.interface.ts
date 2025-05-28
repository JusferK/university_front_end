import { ICatedratic } from "../../../interface/ICatedratic.interface";
import { IStudent } from "../../../interface/IStudent.interface";

export interface IListUser {
  users: {
    catedratics: ICatedratic[],
    students: IStudent[],
  }
}
