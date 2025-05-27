import {Component, inject, OnInit} from '@angular/core';
import {RedirectToSessionService} from "./service/execution/redirect-to-session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private _sessionRedirectService: RedirectToSessionService = inject(RedirectToSessionService);

  ngOnInit(): void {
    this._sessionRedirectService.redirect();
  }

}
