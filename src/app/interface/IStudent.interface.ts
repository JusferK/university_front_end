import { ESex } from "../enum/ESex.enum";
import { IStudentCourse } from "./IStudentCourse.interface";

export interface IStudent {
  studentId?: number;
  name: string;
  lastName: string;
  email: string;
  sex: ESex;
  birthDate: Date;
  courses: IStudentCourse[];
}
