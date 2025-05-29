import { ESex } from "../enum/ESex.enum";
import { IStudentCourse } from "./IStudentCourse.interface";
import { ICatedratic } from "./ICatedratic.interface";

export interface IStudent {
  studentId?: number;
  name: string;
  lastName: string;
  email: string;
  sex: ESex;
  birthDate: Date;
  courses: IStudentCourse[];
}

export const isStudent: (user: IStudent | ICatedratic) => boolean = (user: IStudent | ICatedratic): boolean => {
  return 'studentId' in user;
}
