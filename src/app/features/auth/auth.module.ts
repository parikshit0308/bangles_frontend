import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { GoogleSuccessComponentComponent } from './google-success-component/google-success-component.component';

@NgModule({
  declarations: [LoginComponent, GoogleSuccessComponentComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthRoutingModule],
})
export class AuthModule {}
