import { IStudent } from "../../../../../interface/IStudent.interface";

export interface IAssignationTransformation {
  assignedStudents: IStudent[];
  unassignedStudents: IStudent[];
}
