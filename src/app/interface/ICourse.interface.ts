import { IStudentCourse } from "./IStudentCourse.interface";

export interface ICourse {
  courseId?: number;
  name: string;
  description: string;
  catedraticId: number;
  students: IStudentCourse[];
}
