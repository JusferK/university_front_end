import { Component, inject } from '@angular/core';
import { UtilService } from "./service/execution/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  utilService: UtilService = inject(UtilService);
}
