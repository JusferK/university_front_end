import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  private _route: ActivatedRoute = inject(ActivatedRoute);
  users: Data = [];

  ngOnInit() {
    this.initUsers();
  }

  private initUsers(): void {
    const data = this._route.snapshot.data['users'];
    this.users = data;
  }

}
