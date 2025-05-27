import {ESex} from "../enum/ESex.enum";
import {ICourse} from "./ICourse.interface";

export interface ICatedratic {
  catedraticId: number;
  name: string;
  lastName: string;
  email: string;
  sex: ESex;
  latestDegree: string;
  courses: ICourse[];
}
