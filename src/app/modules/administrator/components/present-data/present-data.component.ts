import {Component, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {IStudent} from "../../../../interface/IStudent.interface";
import {ICatedratic} from "../../../../interface/ICatedratic.interface";

@Component({
  selector: 'app-present-data',
  templateUrl: './present-data.component.html',
  styleUrl: './present-data.component.css'
})
export class PresentDataComponent implements OnInit {

  responseData: InputSignal<IStudent | ICatedratic> = input.required<IStudent | ICatedratic>();
  isStudent: WritableSignal<boolean | null> = signal<boolean | null>(null);
  student: WritableSignal<IStudent | null> = signal<IStudent | null>(null);
  catedratic: WritableSignal<ICatedratic | null> = signal<ICatedratic | null>(null);

  ngOnInit() {
    this.checkIfStudent();
  }

  private checkIfStudent(): void {
    if (this.responseData().hasOwnProperty('studentId')) {
      this.isStudent.set(true);
      this.student.set(this.responseData() as IStudent);
    } else {
      this.isStudent.set(false)
      this.catedratic.set(this.responseData() as ICatedratic);
    }
  }

}
