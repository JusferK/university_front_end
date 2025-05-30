import { IStudentCourse } from "../../../../../interface/IStudentCourse.interface";

export interface IMassiveAssignationApiRequest {
  assignRequests: IStudentCourse[];
  unAssignRequests: IStudentCourse[];
  methodHandler: () => void;
}
