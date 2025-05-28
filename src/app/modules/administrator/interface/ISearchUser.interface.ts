import { IStudent } from "../../../interface/IStudent.interface";
import { ICatedratic } from "../../../interface/ICatedratic.interface";

export interface ISearchUser {
  student: IStudent | null;
  catedratic: ICatedratic | null;
  userType: 'student' | 'catedratic';
}
