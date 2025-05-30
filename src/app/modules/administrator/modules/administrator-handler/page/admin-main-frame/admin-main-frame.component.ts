import { Component } from '@angular/core';
import MenuAdminOptions from "../../../../../../../assets/json/menu-admin-options.json";

@Component({
  selector: 'app-admin-main-frame',
  templateUrl: './admin-main-frame.component.html',
  styleUrl: './admin-main-frame.component.css'
})
export class AdminMainFrameComponent {

  protected readonly adminMenuOptions = MenuAdminOptions;

}
