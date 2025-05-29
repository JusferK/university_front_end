import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import AssignationMenuOptions from '../../../../../assets/json/assignation-menu-options.json';

@Component({
  selector: 'app-assignation',
  templateUrl: './assignation.component.html',
  styleUrl: './assignation.component.css'
})
export class AssignationComponent {

  assignationMenuOptions: MenuItem[] = AssignationMenuOptions;

}
