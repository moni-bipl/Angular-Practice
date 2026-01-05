import { Component,signal } from '@angular/core';
import {form, Field, required,email} from '@angular/forms/signals'
@Component({
  selector: 'app-form',
  imports: [Field],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
 loginModel =signal({
  email:'',
  password:''
 })
 loginForm=form(this.loginModel)
}
