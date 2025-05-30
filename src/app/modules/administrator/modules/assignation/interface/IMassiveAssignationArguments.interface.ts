import { ICourse } from "../../../../../interface/ICourse.interface";
import { IStudent } from "../../../../../interface/IStudent.interface";

export interface IMassiveAssignationArguments {
  course: ICourse;
  studentsAssigned: IStudent[];
  studentsUnassigned: IStudent[];
  methodHandler: () => void;
}
