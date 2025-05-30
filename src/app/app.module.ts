import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { PrimengModule } from "./modules/primeng/primeng.module";
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from "@angular/common/http";
import { PrefixInterceptor } from "./interceptor/prefix.interceptor";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionTypeGuard } from "./guards/session-type.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SessionTypeGuard,
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: PrefixInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
