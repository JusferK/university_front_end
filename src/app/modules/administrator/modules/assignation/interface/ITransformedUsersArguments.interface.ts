import { IStudent } from "../../../../../interface/IStudent.interface";
import { ICatedratic } from "../../../../../interface/ICatedratic.interface";

export interface ITransformedUsersArguments {
  users: {
    students: IStudent[],
    catedratics: ICatedratic[]
  }
}
