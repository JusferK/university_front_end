import { IStudentCourse } from "./IStudentCourse.interface";
import { IStudent } from "./IStudent.interface";
import { ICatedratic } from "./ICatedratic.interface";

export interface ICourse {
  courseId?: number;
  name: string;
  description: string;
  catedraticId: number;
  students: IStudentCourse[];
}

export interface ICourseWithStudents extends ICourse {
  fullStudents: IStudent[];
  catedratic: ICatedratic;
}
