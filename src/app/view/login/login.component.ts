import {
  Component,
  inject,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { LoginService } from "../../service/api/login.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private formBuilder: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  private _loginSubscription!: Subscription;
  private _loginService: LoginService = inject(LoginService);

  ngOnDestroy(): void {
    this._loginSubscription.unsubscribe();
  }

  accessHandler(): void {
    this._loginSubscription = this._loginService.login(this.loginForm.value).subscribe();
  }

}
